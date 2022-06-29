<p align="center">
<img src="./assets/app.png" width=100px height=100px></p>
<h1 align="center"> Kanban-Desktop </h1>
<h3 align="center"> An AI Based Kanban for Windows and Linux* Desktop Users </h3>
<br/>
<p align="center">
<img src="https://img.shields.io/badge/Build-passing-green.svg?style=flat-square">
<img src="https://img.shields.io/badge/Version-2.2.3 Stable-red.svg?style=flat-square">
<img src="https://img.shields.io/badge/Electron-18.0.4-blue.svg?style=flat-square">
<img src="https://img.shields.io/badge/License-GPL-purple.svg?style=flat-square">
</p>

### 🎉A kanban girl plugin that can put on your desktop! Designed for Windows and Linux desktop users with plenty of cloud models. Supports cloud and local moc2 model loading. Plenty of tools like NLP dialog, web search and schedule reminder. Continuously updating.

**Notice: This Readme(English Ver) is still under translation.We'll do our best to finish the translation work.**
---
## 🎰Functions available now:
- Specially designed UI with fake-blur theme and toolbox design for desktop users make it more elegant to use on the desktop.
- Carry on the past Web version, the app is connected with Tencent NLP API and is able to start conversations timely with texting.
- You can conveniently switch the input box at the bottom of the app to web-searching mode and search whatever you want at any time with your customized search engines.
- Brand NEW calendar schedule reminder included. Kanban can automatically remind you by alerting with sound and visual effects after you input your remind time and context. The alert sounds are from MIUI default ringtone database.
- New bubble mode allows you to minimize the kanban girl by clicking the "×" button in the toolbox. The app will then minimize to a small bubble on the right-bottom side of your screen.
- We added many new models for our original cloud API. Meanwhile we also allow you to build your own web-API and fill your API's URL in the app's Settings page.
- Our project supports local live2d moc2 model file loading. You can select your local moc2 model's JSON manifest file and load your own model offline. If you don't have a local moc2 model, you can also select to still use the web API mode.
- We added the brand new 2x HD rendering system, which makes the kanban girl more suitable for high-resolution screens.
- The new version added the global settings function. In settings you can easily modify settings like toolbox showing functions,live2d api url,kanban behaviors and even try the experimental functions! Also, we'll add more setting selections in future versions.
- Our kanban girl plugin supports global dragging. You can drag the plugin to any place on your desktop by using your mouse to press and drag the plugin's dialog box.
- Many new functions are now under development. You can check for the project's developing process in the repository's Project Tab.
---
## 📺Installation:
Please step to the project's Release and download the latest installation pack. The Stable Release channel defaultly include one .zip package and another .exe package for Windows platform, alone with an .Appimage package packed under Endeavour OS Linux (Arch-based) for Linux users. Sadly Mac OS users need to manually build and pack the project due to device limitations.
<br/>The Prerelease channel will push out preview versions. They have more unfinished brand NEW functions for you to try, but just as you can see, they're unfinished so they may have many bugs that can affect your using. Thus, please notice that the prerelease versions are only for testing.
Release URL:[Release](https://github.com/JimHans/kanban-desktop/releases)

---
## 📚User Manual:
<br/>
<p align="center">
<img src="./demo.png" width=100% height=auto></p>

---
## 📌Notice When Using:
- #### 1.This APP is developed with Electron framework. Thus, the APP supports cross-platform and can run on Windows, MacOS and Linux. We only provide Windows and Linux installation pack in our Release. If you want to run the APP on MacOS, pls clone the repository using `git clone` and pack locally by yourself.
- #### 2.在使用本项目�?带的NLP时，请注意不要发送过多�?�求导致腾�??云API免费次数到达限制。后期，�?项目将在设置�?加入NLPAPI手动�?写功能，并�?�公用API设置限制。自行注册腾�?云API的方式，请�?�下方附录教�?
- #### 3.�?项目使用的模型文件版权均归相关版权方所有，后期�?项目将在设置�?提供�?建模型API选项，并�?能加入本地模型加载功能来避开这个限制。至于这�?功能什么时候上线，我也不知道ㄟ( �?, �? )�?
- #### 4.由于使用Electron进�?�构建，所以性能开销略大，耗电量较高，不建�?给笔记本使用，建�?挂在台式机�?�用

---
## �?�FAQ
* Q:为什么我打开后不会显示live2d模型�?
* A:视网络情况而定，初次使用时需要从模型API获取模型数据。由于默�?API服务器带宽不够（穷），所以可能需要等待一段时间才能加载完成，请您耐心等待或者在设置界面�?�?写其他API地址来提升加载速度。未来，�?项目将加入本地加载功能来弥补此问题�?
- Q:我�?��?�何才能关闭日程提醒的响铃？
- A:您可以在设定日程到达时间后，点击弹出的日程通知来关�?响铃�?
* Q:什么时候能加入对moc3与本地模型文件的�?持？
* A:好问题，�?地模型加载模式目前已经基�?开发完成（能用级别）并已经在Prerelease通道内开放测试，moc3�?持可能�?�等等了，我也不知道啥时候能加�?

<br/>

*✨�?�果您有对本项目的更多运行、部署与代码方面的问题，以及对本项目有更好的看法与构思，欢迎在本项目Issue下留言，或者为�?项目Pull Requests�?*

---

## 📝Appendix:
- 1.如果你需要自己申请腾讯NLP�?然�??言处理服务，可以参考本项目的前�?-网页版本AI看板娘的NLP�?建教程，链接如下：[�?建教程](https://github.com/JimHans/AI-waifu)
- 2.新的�?地模式目前仍不稳定，其需要在模型配置清单Json文件内加�?hit_areas_custom配置才能读取到触摸范围，从而响应触摸�?�为。其他需要注意的配置我将在未来进行整理。相应的Json�?视化配置功能�?来也将纳入开发�?�划�?�?

---
## 🧡Thanks to:

[live2d_demo / ©fghrsh / GPL v2.0][1]  
[live2d-widget / ©xiazeyu / GPL v2.0][2]  
[live2d_src / ©journey-ad / GPL v2.0][3]    
[AI-Waifu / ©jimhans / GPL v2.0][4]  

Live2d Cubism SDK WebGL 2.1 Project & All model authors.

Open sourced under the GPL v3.0 license.

### 🔗Annotation:
*: The support for Linux now is NOT perfect and have unexpected bugs.
**: Local model loading mode is only available in prerelease channel.

  [1]: https://github.com/fghrsh/live2d_demo
  [2]: https://github.com/xiazeyu/live2d-widget.js
  [3]: https://github.com/journey-ad/live2d_src
  [4]: https://github.com/JimHans/AI-waifu