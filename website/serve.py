"""Local preview with byte ranges for reliable audio/video seeking."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re


class MediaHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.byte_range = None
        path = Path(self.translate_path(self.path))
        requested = self.headers.get('Range')
        if not requested or not path.is_file():
            return super().send_head()
        size = path.stat().st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', requested)
        if not match or not size:
            self.send_error(416, 'Invalid range')
            return None
        left, right = match.groups()
        if left:
            start, end = int(left), min(int(right), size - 1) if right else size - 1
        elif right:
            start, end = max(0, size - int(right)), size - 1
        else:
            start, end = size, size - 1
        if start >= size or start > end:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.end_headers()
            return None
        handle = path.open('rb')
        handle.seek(start)
        self.byte_range = end - start + 1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Content-Length', str(self.byte_range))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        return handle

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def copyfile(self, source, outputfile):
        if self.byte_range is None:
            return super().copyfile(source, outputfile)
        remaining = self.byte_range
        try:
            while remaining:
                chunk = source.read(min(65536, remaining))
                if not chunk:
                    break
                outputfile.write(chunk)
                remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError):
            pass


if __name__ == '__main__':
    handler = partial(MediaHandler, directory=str(Path(__file__).parent))
    print('Preview: http://127.0.0.1:8770/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 8770), handler).serve_forever()
