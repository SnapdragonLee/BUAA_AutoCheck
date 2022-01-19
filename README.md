## BUAA AutoCheck V1.50

北航健康打卡自动插件，现可在 **任意可安装 Python3 的操作系统** 和 **iOS/iPadOS 12.0 及更新** 中进行部署。



*注意：**Android** 也可以部署 Python3.x 脚本，但无法部署定时自动任务，如有想法可以发起 Issue 进行讨论。



### Needs

###### iOS/iPadOS ：

- iPhone、iPad

- **iOS/iPadOS** **12.0 or later**.
- 捷径 (Shortcuts)
- Scriptable 1.3.3 or up



###### Python3.x ：

- 任意可以安装 Python3.x 的 OS ( `Windows, Linux/UNIX, macOS, Android, iOS/iPadOS` )
- Python3.x



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



###### Python 3.x :

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

- *Android ：可使用 `QPython 3H` 等应用的 Python 便携环境，经过 pip 部署包后，进行使用，但暂时没有自动脚本的解决方案，如有人有其他解决方案，可发起 issue 一起讨论。



### Logs

- 2022.1.20 V1.50 添加 Python3.x 版脚本，任意可安装 Python3.x 系统都可自动打卡（Android 还未支持），并修改了项目结构与说明文档。

- 2022.1.16 V1.20 添加 iOS/iPadOS 12.0 至 13.x 系统的支持，增加报错信息，修改操作步骤。

- 2022.1.16 V1.15 紧急修复离校原因与实际原因不符的问题，以及更改了相关的注释。

- 2022.1.16 V1.13 紧急修复判断类型的问题，以及 POST 请求格式的修复，并修改数据样式。

- 2022.1.15 V1.1 修复校内外签到注释有误的问题，并进行了开放测试。

- 2022.1.15 V1.09 内测版，修复乱码以及通知栏显示信息过多的问题。

- 2022.1.14 V1.0 内测版发布，可完成校内外一键设置签到。
