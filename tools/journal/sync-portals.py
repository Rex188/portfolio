"""Sync the tracker's Portal 入口 view from the vault's portal list (links only).

  python3 tools/journal/sync-portals.py            # upload to rexli.life/tracker
  python3 tools/journal/sync-portals.py --dry-run  # show what would be uploaded

Reads 主要美国申请/Portal链接汇总.md (linked from AIOS/Maps/me.md). Only the school,
portal name, links and a short note are uploaded. Emails, IDs, application
numbers and any fragment mentioning passwords, PINs or usernames are dropped,
and the server refuses anything that still looks like a credential.
"""
import http.cookiejar
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

VAULT = Path(__file__).resolve().parents[3]
SOURCE = VAULT / '主要美国申请' / 'Portal链接汇总.md'
ACCESS = Path.home() / '.codex' / 'private' / 'rex-admissions-access.txt'
BASE = 'https://rexli.life'

SECRET = re.compile(r'密码|口令|用户名|账号|帐号|password|passwd|username|\bpin\b|computing id|验证码', re.I)
LINK = re.compile(r'\[([^\]]+)\]\((https?://[^)\s]+)\)')


def clean_note(text):
    text = LINK.sub(r'\1', text)
    text = re.sub(r'`[^`]*`', '', text)                        # IDs in code spans
    text = re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+', '', text)        # emails
    text = re.sub(r'(申请号|App\.? ?No\.?|Applicant ID)\s*[:：]?\s*\w+', '', text, flags=re.I)
    text = re.sub(r'\b\d{7,}\b', '', text)                     # application numbers
    text = re.sub(r'见待办\s*\d+', '', text)                    # refers to the source file's own to-do list
    text = re.sub(r'[（(][^）)]*[）)]', lambda m: '' if SECRET.search(m.group()) else m.group(), text)
    parts = [p.strip(' ，,、') for p in re.split(r'[；;]', text)]
    return '；'.join(p for p in parts if p and not SECRET.search(p)).strip()


def region_for(section, school):
    if 'UBC' in school:
        return '香港 / 加拿大'
    if section.startswith('中国大陆'):
        return '日本' if re.search(r'东京|東京|Tokyo', school, re.I) else '中国大陆'
    return section


def parse(md):
    portals, section = [], None
    for line in md.splitlines():
        heading = re.match(r'^##\s+(.+)', line)
        if heading:
            section = heading.group(1).strip()
            continue
        if section not in ('美国', '香港', '中国大陆 / 日本') or not line.startswith('|'):
            continue
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) < 4 or cells[0] in ('学校', '') or set(cells[0]) <= set('- :'):
            continue
        school, portal, links_cell, note = cells[:4]
        if '非 Portal' in portal:
            continue
        links = [{'label': clean_note(label) or '认领入口', 'url': url} for label, url in LINK.findall(links_cell)]
        extra = '' if links else clean_note(links_cell)
        note = '；'.join(x for x in (clean_note(note), extra) if x)
        portals.append({'school': clean_note(school), 'portal': clean_note(portal),
                        'region': region_for(section, school), 'links': links, 'note': note})
    return portals


def upload(portals):
    password = ACCESS.read_text().split('密码：')[1].strip()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def call(method, data=None, suffix=''):
        req = urllib.request.Request(BASE + '/api/journal' + suffix, method=method,
                                     data=json.dumps(data, ensure_ascii=False).encode() if data is not None else None,
                                     headers={'Origin': BASE, 'Content-Type': 'application/json'})
        try:
            with opener.open(req, timeout=60) as response:
                return response.status, json.load(response)
        except urllib.error.HTTPError as error:
            return error.code, json.load(error)

    code, reply = call('POST', {'password': password}, '?action=login')
    if code != 200:
        sys.exit('网站登录失败：' + str(reply.get('error', code)))
    code, reply = call('POST', {'portals': portals}, '?action=portals')
    if code != 200:
        sys.exit('上传失败：' + str(reply.get('error', code)))
    print(f"已同步 {reply['count']} 个 Portal 入口到 {BASE}/tracker/")


if __name__ == '__main__':
    path = Path(next((a for a in sys.argv[1:] if not a.startswith('--')), SOURCE))
    portals = parse(path.read_text())
    leaks = [p for p in portals if SECRET.search(json.dumps(p, ensure_ascii=False))]
    if leaks:
        sys.exit('发现疑似账号密码内容，未上传：' + ', '.join(p['school'] for p in leaks))
    for p in portals:
        print(f"{p['region']:8} {p['school']} · {p['portal']}  [{', '.join(l['label'] for l in p['links']) or '无直链'}]  {p['note']}")
    if '--dry-run' not in sys.argv:
        upload(portals)
