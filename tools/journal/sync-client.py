"""Read/apply a Gmail evidence plan without exposing the website password."""
import argparse
import http.cookiejar
import json
import os
from pathlib import Path
import time
import urllib.error
import urllib.request

PRIVATE = Path.home() / '.codex' / 'private'
BASE = 'https://rexli.life'

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['read', 'apply'])
    parser.add_argument('plan', nargs='?')
    args = parser.parse_args()
    password = (PRIVATE / 'rex-admissions-access.txt').read_text().split('密码：')[1].strip()
    client = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def request(method, data=None, suffix=''):
        req = urllib.request.Request(BASE + '/api/journal' + suffix,
            data=json.dumps(data, ensure_ascii=False).encode() if data is not None else None,
            method=method, headers={'Origin': BASE, 'Content-Type': 'application/json'})
        try:
            with client.open(req, timeout=60) as response:
                return response.status, json.load(response)
        except urllib.error.HTTPError as error:
            return error.code, json.load(error)

    code, reply = request('POST', {'password': password}, '?action=login')
    if code != 200:
        raise RuntimeError('网站登录失败：' + str(reply.get('error', code)))
    if args.action == 'read':
        code, state = request('GET')
        if code != 200:
            raise RuntimeError('读取失败：' + str(state.get('error', code)))
        path = PRIVATE / 'journal-sync-current.json'
        path.write_text(json.dumps(state, ensure_ascii=False, indent=2))
        os.chmod(path, 0o600)
        print(json.dumps({'records': len(state['records']), 'revision': state['revision'],
            'sync': {k:v for k,v in (state.get('sync') or {}).items() if k != 'processedMessageIds'},
            'saved_to': str(path)}, ensure_ascii=False))
        return
    if not args.plan:
        parser.error('apply requires a local plan JSON file')
    plan = json.loads(Path(args.plan).read_text())
    for attempt in range(3):
        code, result = request('POST', plan, '?action=sync')
        if code == 200:
            receipt = PRIVATE / 'journal-last-sync-receipt.json'
            receipt.write_text(json.dumps(result, ensure_ascii=False, indent=2))
            os.chmod(receipt, 0o600)
            print(json.dumps({'revision': result['revision'], 'report': result['report'],
                'lastSuccessAt': result['sync']['lastSuccessAt']}, ensure_ascii=False))
            return
        if code != 409 or attempt == 2:
            raise RuntimeError('同步失败：' + str(result.get('error', code)))
        time.sleep(1)

if __name__ == '__main__':
    main()
