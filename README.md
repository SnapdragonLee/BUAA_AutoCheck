## BUAA_AutoCheck V1.60 (Archive)



### 本仓库自 2022.12.8 起停止更新。从 2020.1.31 至 2022.12.8，新冠疫情时代就此终结，我们用生命中的 1042 天陪伴了这款小程序，相信它已经是大家脑海中无法磨灭的记忆。无论它令你认为麻烦还是安心，如今我们都将与它分别，走向未知的未来。凡此以往，皆为序章，感谢大家使用本仓库脚本，希望大家今后的日子健健康康，平平安安。我们，江湖再见！



![image-20221208194543284](Img/image-20221208194543284.png)![image-20221208194758718](Img/image-20221208194758718.png)





------



北航健康打卡自动插件，现可在 **任意可安装 Python3 的操作系统** 、 **iOS/iPadOS 12.0 及更新** 或 有 **Auto.js 的安卓设备** 中进行部署。


*注意：

1. 目前 BUAA 正在进行自动打卡筛查，所有因为使用造成的法律问题，本项目不承担任何责任，望周知！

2. 目前 **Android 搭配 Auto.js 应用** 可以完成定时自动打卡任务，在这里感谢 KZdavid 提交的方案。有其它问题欢迎提交 issue！



------

### Needs

###### iOS/iPadOS ：

- iPhone、iPad

- **iOS/iPadOS** **12.0 or later**.
- 捷径 (Shortcuts)
- Scriptable 1.3.3 or up

###### Python3.x ：

- 任意可以安装 Python3.x 的 OS ( `Windows, Linux/UNIX, macOS, Android, iOS/iPadOS` )
- Python3.x

###### Auto.js ：

- 可以安装 Auto.js 的 Android 系统设备

  

------

### Deployment

*注意！！本脚本没有留位置变动原因的填报口，因此如果你刚刚发生了位置变动，假如你能看得懂上传的信息格式，那么可以自行手动填写信息；但如果你看不懂，那就先自行签一天，再在第二天及之后使用本脚本！*



###### iOS/iPadOS :

**Simply Run :**

1. 先在 App Store 上下载 `Scriptable`；
2. 右上角新建一个脚本；
3. 若 iOS/iPadOS 版本为 12.0 至 13.x，将 `iOS12u/check12.js` 全部复制到新建的脚本中；若 iOS/iPadOS 版本为 14.0 及更新，将 `iOS12u/check14.js` 全部复制到新建的脚本中；
4. 将 34 行之前的内容一次性改好（根据注释填写，有的栏没说写什么就不用写）；
5. 在校内或校外只需要更改 `boarder` 的值就好，在校就在双引号内填 1，不在校就填 0。一次设置，长时间使用；
6. 执行一遍脚本查看请求是否上传成功，若不成功，可根据报错信息查找原因。

**Auto Check :**

1. 在 Shortcuts (捷径) 中添加新自动化，设置每天在特定时间 `xx:xx` ，添加操作中填写 `run script`，在虚蓝色 `Script` 中选择刚刚创建的脚本，设置完成；若 iOS/iPadOS 版本为 14.0 及更新，可以选择直接定时运行；若 iOS/iPadOS 版本为 12.0 ~ 13.x，则在通知栏确认一下即可执行；
2. 可重复 1. 操作，多设置几次自动填报，省的在填报的时候没有网络导致没成功签到。



###### Python3.x :

**Simply Run :**

1. 安装 Python3，可从官网 https://www.python.org/ ，或使用命令下载。
2. `Windows/Linux Series` 需将 python 加入环境变量，不知道如何做的参考 [windows 和 Linux 添加环境变量_JRighte的博客-CSDN博客](https://blog.csdn.net/weixin_38507462/article/details/101771996) ；虚拟 Python 环境不需要添加。
3. 在 Python 所在的系统新建一个自定义文件 `xx.py`，将 `Python3x/checkPy3.py` 全部复制到 `xx.py` 中。并将 34 行之前的内容按照注释填好；
4. 在校内或校外只需要更改 `boarder` 的值就好，在校就在双引号内填 1，不在校就填 0。一次设置，长时间使用；
5. 在想要执行脚本的 Python3 环境下使用 `pip install requests` 安装 `requests`，若已存在，可跳过。
6. 在 OS 中启动 Shell，在 `xx.py` 所在目录使用命令 `python xx.py` 执行脚本，查看请求是否上传成功，若不成功，可根据报错信息查找原因。

**Auto Check** :

- Linux Series ：`Crontab` 命令，或可编辑 `/etc/crontab`，例如 `0 18 * * * python ~/xx.py`；
- Windows ：任务计划程序 (Task Scheduler)；
- iOS/iPadOS ：在 App Store 内下载 `iSH`，更新应用内的 Alpine Linux ，之后安装 Python3 和 BusyBox，再按照 Linux Series 所述的方法进行部署；



###### Auto.js :

**Simply Run :**

1. 安装 Auto.js Pro，需要 45 RMB，官网下载即可 https://pro.autojs.org/ ，不想花钱的可以去 https://github.com/hyb1996/Auto.js 自行下载源码编译 ~~（或者可以有crack之类的方式）~~；
2. 下载 AutoJs 文件夹里的两个 `.js` 文件到设备中，点击 Auto.js 主页面右下角选择导入，选择导入两个文件即可；
3. 将 `buaaCheckAutoJS.js` 的 32 行前的内容一次性改好（根据注释填写，有的栏没说写什么就不用写）；
4. 在校内或校外只需要更改 `boarder` 的值就好，在校就在双引号内填 1，不在校就填 0。一次设置，长时间使用；
5. 执行一遍脚本查看请求是否上传成功，若不成功，可根据报错信息查找原因。

**Auto Check :**
1. Auto.js 主页面选择 `buaaCheckAutoJS.js` 右侧三点打开菜单，点击设置任务；
2. 选择每天运行并定时，右上角确认即可。



------

### Logs

- 2022.12.8 本仓库因健康打卡暂停而停止更新，在此感谢大家使用本仓库内脚本。

- 2022.11.8 请大家使用前一定要阅读所有注意事项。

- 2022.10.12 V1.60 感谢 **KZdavid** 提供的 Auto.js 的脚本，为安卓的自动化打卡增添了新的方式。

- 2022.2.13 V1.50.1 无新功能加入，仅修复程序结构与格式。

- 2022.1.20 V1.50 添加 Python3.x 版脚本，任意可安装 Python3.x 系统都可自动打卡（Android 还未支持），并修改了项目结构与说明文档。

- 2022.1.16 V1.20 添加 iOS/iPadOS 12.0 至 13.x 系统的支持，增加报错信息，修改操作步骤。

- 2022.1.16 V1.15 紧急修复离校原因与实际原因不符的问题，以及更改了相关的注释。

- 2022.1.16 V1.13 紧急修复判断类型的问题，以及 POST 请求格式的修复，并修改数据样式。

- 2022.1.15 V1.10 修复校内外签到注释有误的问题，并进行了开放测试。

- 2022.1.15 V1.09 内测版，修复乱码以及通知栏显示信息过多的问题。

- 2022.1.14 V1.0 内测版发布，可完成校内外一键设置签到。
