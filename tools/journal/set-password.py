"""Set a new tracker password. Run it yourself in Terminal; the password is typed
hidden and never printed.

  python3 tools/journal/set-password.py

Writes:
  - auth-config.json (repo root): salt + PBKDF2-SHA256 hash checked by api/journal.js
  - ~/.codex/private/rex-admissions-access.txt: URL + password, read by sync-client.py
    for the Gmail auto-sync (stays on this Mac, never committed)
"""
import getpass
import hashlib
import json
import os
import secrets
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONFIG = ROOT / 'auth-config.json'
ACCESS = Path.home() / '.codex' / 'private' / 'rex-admissions-access.txt'
URL = 'https://rexli.life/tracker/'
ITERATIONS = 600000  # must match api/journal.js

first = getpass.getpass('新密码（输入时不显示）: ')
if len(first) < 10:
    sys.exit('密码至少 10 位，未做任何修改。')
if getpass.getpass('再输入一次: ') != first:
    sys.exit('两次输入不一致，未做任何修改。')

salt = secrets.token_hex(24)
digest = hashlib.pbkdf2_hmac('sha256', first.encode(), salt.encode(), ITERATIONS, 32).hex()
CONFIG.write_text(json.dumps({'salt': salt, 'hash': digest}, indent=2) + '\n')

ACCESS.parent.mkdir(parents=True, exist_ok=True)
ACCESS.write_text(f'网址：{URL}\n密码：{first}\n')
os.chmod(ACCESS, 0o600)

print(f'已更新 {CONFIG}')
print(f'已更新 {ACCESS}（Gmail 自动同步用）')
print('部署后新密码生效，旧密码和所有已登录的浏览器都会失效。')
