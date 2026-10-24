"""Acoustic novelty against preceding repeated material; not semantic event detection.

Run with NumPy installed and --ffmpeg /path/to/ffmpeg. No model, network, or
changes to source audio. Generates a reproducible timeline and review candidates.
"""
import argparse
import json
import subprocess
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent
RATE = 16000


def smooth(values, length):
    pad = length // 2
    return np.convolve(np.pad(values, (pad, pad), mode='edge'),
                       np.ones(length) / length, mode='valid')[:len(values)]


def descriptors(samples):
    # Gain-independent spectral shape plus within-second spectral variability.
    frames = np.lib.stride_tricks.sliding_window_view(samples, 1024)[::256]
    edges = np.geomspace(60, 7600, 33)
    freq = np.fft.rfftfreq(1024, 1 / RATE)
    bands = []
    for start in range(0, len(frames), 2048):
        power = np.abs(np.fft.rfft(frames[start:start+2048] * np.hanning(1024)))**2
        bands.append(np.stack([power[:, (freq >= a) & (freq < b)].sum(axis=1)
                               for a, b in zip(edges[:-1], edges[1:])], axis=1))
    bands = np.concatenate(bands)
    proportions = bands / np.maximum(bands.sum(axis=1, keepdims=True), 1e-16)
    # Hellinger embedding retains proportions without amplifying quiet bins.
    shape = np.sqrt(proportions)
    seconds = (np.arange(len(frames)) * 256 + 512) / RATE
    count = int(np.ceil(len(samples) / RATE))
    features, rms = [], []
    for sec in range(count):
        selection = shape[(seconds >= sec) & (seconds < sec+1)]
        if not len(selection): selection = shape[-1:]
        features.append(np.r_[selection.mean(axis=0), selection.std(axis=0)*1.5])
        block = samples[sec*RATE:(sec+1)*RATE]
        rms.append(float(np.sqrt(np.mean(block**2))))
    return np.array(features), np.array(rms)


def novelty(features, rms):
    # Three-second contexts distinguish textural changes from isolated pulses.
    contexts = np.array([features[max(0, i-1):i+2].mean(axis=0)
                         for i in range(len(features))])
    scores = np.zeros(len(contexts))
    for i in range(6, len(contexts)):
        history = contexts[max(0, i-120):i-3]
        distances = np.linalg.norm(history-contexts[i], axis=1)
        # Average 3 closest earlier contexts: repeated material stays low.
        nearest = np.sort(distances)[:min(3, len(distances))].mean()
        recent = np.linalg.norm(contexts[max(0, i-15):i-3].mean(axis=0)-contexts[i])
        scores[i] = .8*nearest + .2*recent
    # Silence and very quiet gaps should not masquerade as new sound sources.
    gate = np.clip(rms / max(np.percentile(rms, 70)*.1, 1e-10), 0, 1)
    scores *= gate
    # No history exists at entry; taper that boundary rather than marking it new.
    scores *= np.minimum(np.arange(len(scores))/15, 1)
    return smooth(scores, 3)


def clock(t):
    return f'{int(t)//60}:{int(t)%60:02d}'


def analyze(path, ffmpeg):
    decoded = subprocess.run([ffmpeg, '-v', 'error', '-i', str(path), '-vn',
                              '-ac', '1', '-ar', str(RATE), '-f', 's16le', '-'],
                             check=True, capture_output=True).stdout
    samples = np.frombuffer(decoded, dtype='<i2').astype(np.float32)/32768
    features, rms = descriptors(samples)
    raw = novelty(features, rms)
    low, high = np.percentile(raw[15:-5], [25, 97])
    relative = np.clip((raw-low)/max(high-low, 1e-8), 0, 1)
    # Keep measured values; no decorative random peaks or audio modulation.
    curve = smooth(relative, 3)
    choices = []
    for i in np.argsort(curve)[::-1]:
        if i < 18 or i > len(curve)-8 or curve[i] < .55: continue
        if all(abs(int(i)-c['seconds']) >= 25 for c in choices):
            choices.append({'seconds':int(i), 'time':clock(i),
                            'relativeScore':round(float(curve[i]), 3),
                            'rawDistance':round(float(raw[i]), 5),
                            'reviewStart':max(0, int(i)-6)})
        if len(choices) == 6: break
    choices.sort(key=lambda c:c['seconds'])
    return {'duration':round(len(samples)/RATE, 3), 'stepSeconds':1,
            'values':np.round(curve, 4).tolist(), 'candidates':choices,
            'normalization':{'low':float(low),'high':float(high)},
            'rmsCorrelation':round(float(np.corrcoef(raw, rms)[0, 1]), 3)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ffmpeg', required=True)
    args = parser.parse_args()
    data = {'method':'spectral-recurrence-v1', 'meaning':'Relative acoustic change, not confirmed new elements.',
            'tracks':{}}
    for name in ['original', 'vcv']:
        result = analyze(ROOT/'assets'/f'{name}.m4a', args.ffmpeg)
        data['tracks'][name] = result
        print(name, 'duration', result['duration'], 'candidates', result['candidates'])
    (ROOT/'assets'/'audio-change.json').write_text(json.dumps(data, ensure_ascii=False, indent=2))
    (ROOT/'assets'/'audio-change.js').write_text('window.AUDIO_CHANGE = '+json.dumps(data, ensure_ascii=False)+';\n')
    lines = ['# 九华山声音变化分析', '',
             '由实际网页音频离线计算；未修改录音。结果是待回听的声学变化候选，不能确认声源身份、新采样写入或 patch 内部事件。', '',
             '16 kHz单声道分析；64 ms窗、16 ms步长；32个对数频带。按帧归一化频谱能量，提取每秒频谱形状与变化程度，再比较3秒上下文与此前最多120秒的重复材料。最相近的3个历史上下文用于抑制重复事件，另加入近期背景差异。抑制静音与开头无历史区域。', '',
             '每份音频独立按25%与97%分位归一化供页面显示；两份曲线的高度不可用来比较绝对变化量。约3秒时间分辨率，峰值可能晚于事件起点，因此建议从峰值前6秒开始回听。每个新循环、效果参数变化、噪声或混音变化都可能造成候选；先前出现过的元素也可能再次被检测。', '']
    for name, result in data['tracks'].items():
        lines += [f'## {name}', '', f'全长 {clock(result["duration"])}；声学变化距离与每秒RMS相关系数：{result["rmsCorrelation"]}（描述性指标，不代表已排除音量影响）。', '',
                  '| 候选峰值 | 建议开始回听 | 相对分数 |', '| --- | --- | --- |']
        lines += [f'| {c["time"]} | {clock(c["reviewStart"])} | {c["relativeScore"]} |' for c in result['candidates']]
        lines += ['']
    (ROOT/'audio-analysis.md').write_text('\n'.join(lines))


if __name__ == '__main__':
    main()
