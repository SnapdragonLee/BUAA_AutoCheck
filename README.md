## BUAA AutoCheck

北航健康打卡自动插件，暂时 **仅支持 iOS/iPadOS 14.0 及以后**，后续可能添加安卓支持。现对于 **iOS/iPadOS** 可设置 **捷径 (Shortcuts)** 进行自动打卡。



### Needs

- iPad、iPhone

- iOS/iPadOS 14.0 or later.
- 捷径 (Shortcuts)
- Scriptable





### Startup

1. 先在 App Store 上下载 Scriptable 软件；
2. 右上角新建一个脚本；
3. 将 check.js 全部复制到新建的脚本中；
4. 将 34 行之前的内容一次性改好（根据注释填写，有的栏没说写什么就不用动）；
5. 在校内或校外只需要更改 `boarder` 的值就好，在校填 1，不在校填 0；一次设置，长时间使用；
6. 运行一遍脚本查看请求是否上传成功；
7. 在 Shortcuts (捷径) 中添加新自动化，设置每天在特定时间 `xx:xx` ，添加操作中填写 `run script`，在虚蓝色 `Script` 中选择刚刚创建的脚本，设置完成；
8. 可重复 7. 操作，多设置几次自动填报，省的在填报的时候没有网络导致没成功签到。



### Bugs

<====>

