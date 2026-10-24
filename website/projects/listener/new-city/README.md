# Listener — 新城市广场

基于用户认可的 Listener Sound Place 模板，保留简洁布局、手动声音切换、1.2秒淡化、音量与定位、空格播放/暂停和独立声学变化进度线。地点 description 留在 `place.js`，完全由 Rex 写；空白时不显示占位文字。

## 素材来源

- 背景：`/Volumes/Rex/Movies/新城市/新城市.mp4`。
- 背景处理：完整11:44录屏，裁去部分桌面边缘后转H.264、24fps静音循环。没有现场摄影，不伪造或借用其他地点的画面。
- 第一音轨：`/Volumes/Rex/Movies/新城市/新城市.mp4` 原有AAC音轨完整提取，不改变内容。
- VCV：`/Users/rexli/Desktop/shazi Project/new city plaza.als` 引用的 `/Users/rexli/Desktop/shazi Project/Samples/Recorded/3-Audio 0003 [2026-10-23 190053].wav`，完整转AAC。
- 不包含Ableton轨道和母带效果的另行渲染。原始文件和工程未修改；浏览器不实时运行patch。
- 第一音轨约 704.17 秒，VCV约 612.61 秒；切换时按相同秒数对齐播放位置；这不代表两次录制的声学事件天然同步。

## 声学变化分析

各自的 `assets/audio-change.js` / `.json` 由本地点两份实际录音独立计算，未复用颐和路曲线。方法和候选时间见 [audio-analysis.md](audio-analysis.md)。峰值代表相对此前重复材料的声学差异，不能据此确认新声源或patch录入事件。

## 本地预览

在父目录运行 `python3 serve.py`，打开 `http://127.0.0.1:8768/locations/new-city/`。顶部 Listener 链接返回地点列表。服务器支持媒体字节范围请求。页面相对路径不依赖外部盘，已制作本地素材副本。

## 录屏音轨的边界

录屏主要展示VCV/Ableton；未核实其音轨是否为未经处理的麦克风原声。因此页面明确标为“录屏音轨 / Screen audio”。不能将它作为已确认干声与VCV效果的对照。工程中另有47.62秒与21.58秒短录音；本页选用编排轨及会话片段均引用的612.60秒长录音，不拼接不同take。


正式网站副本：从 website/ 运行 python3 serve.py，然后访问 /projects/listener/new-city/ 。所有运行素材使用相对路径，部署无需连接外部盘。
