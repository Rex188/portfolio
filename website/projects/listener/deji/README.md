# Listener — 德基广场

基于用户认可的 Listener Sound Place 模板，保留简洁布局、手动声音切换、1.2秒淡化、音量与定位、空格播放/暂停和独立声学变化进度线。地点 description 留在 `place.js`，完全由 Rex 写；空白时不显示占位文字。

## 素材来源

- 背景：`/Volumes/Rex/Movies/德基/IMG_1359.MOV`。
- 背景处理：完整26.90秒延时摄影，1600×900 H.264，静音循环。
- 第一音轨：`/Volumes/Rex/Movies/德基/德基.mp4` 原有AAC音轨完整提取，不改变内容。
- VCV：`/Users/rexli/Desktop/shazi Project/新街口.als` 引用的 `/Users/rexli/Desktop/shazi Project/Samples/Recorded/3-Audio 0001 [2026-10-23 200825].wav`，完整转AAC。
- 不包含Ableton轨道和母带效果的另行渲染。原始文件和工程未修改；浏览器不实时运行patch。
- 第一音轨约 619.90 秒，VCV约 600.55 秒；切换时按相同秒数对齐播放位置；这不代表两次录制的声学事件天然同步。

## 声学变化分析

各自的 `assets/audio-change.js` / `.json` 由本地点两份实际录音独立计算，未复用颐和路曲线。方法和候选时间见 [audio-analysis.md](audio-analysis.md)。峰值代表相对此前重复材料的声学差异，不能据此确认新声源或patch录入事件。

## 本地预览

在父目录运行 `python3 serve.py`，打开 `http://127.0.0.1:8768/locations/deji/`。顶部 Listener 链接返回地点列表。服务器支持媒体字节范围请求。页面相对路径不依赖外部盘，已制作本地素材副本。


正式网站副本：从 website/ 运行 python3 serve.py，然后访问 /projects/listener/deji/ 。所有运行素材使用相对路径，部署无需连接外部盘。
