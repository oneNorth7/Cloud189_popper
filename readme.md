# [雷利子](https://github.com/oneNorth7/Cloud189_popper)

![](https://gitee.com/oneNorth7/pics/raw/master/picgo/pentagram-devil.png)

## 创作声明

此脚本的突破原理是通过**调用官方接口**实现，**不存在任何操作或盗取个人Cookie的行为，欢迎大家监督**！！！

## 命名由来

> 隐藏着黑暗力量的钥匙啊,在我面前显示你真正的力量！现在以你的主人，小樱之名命令你——封印解除！

魔卡少女樱变身咒语的日语原台词最后一句为*レリーズ*，即`release`，取谐音*雷利子*，意为释放，中二点就是封印解除。

## 痛点问题

**2021年6月16日**天翼云盘官网**升级改版**后，文件大小下载限制提升为1G，但大于1G的文件、多文件下载只能**转存**后通过**官方客户端**下载。

![提示安装客户端](https://gitee.com/oneNorth7/pics/raw/master/picgo/提示安装客户端.jpg)

## 功能描述

- [x] 突破**单文件分享页**文件大小下载限制
- [x] 突破**多文件分享页**文件大小下载限制
- [x] 突破**个人主页**文件大小下载限制
- [x] 支持**多选文件逐一直接下载**

## 特别说明

* **1G**文件大小下载限制是我**自行测试**和**估摸猜测**出来的，可能不是准确的数字，但编写脚本时是以这个数值作为**突破标准**

* **填写密码后为了保证脚本加载成功，会有一次延迟的页面刷新**，**强烈建议**搭配本人写的[链接助手](https://greasyfork.org/zh-CN/scripts/422773-链接助手)使用

* 天翼云官网**取消**了**文件打包**下载的接口，尝试访问旧的打包接口时提示服务器正在升级和维护，需要**进入目录下载文件**

  ![接口升级维护](https://gitee.com/oneNorth7/pics/raw/master/picgo/接口升级维护.jpg)

* 通过官方接口获取的下载链接都是**有时效**的，单文件、多文件分享页面为**5分钟**，个人主页的下载链接时效久一些（具体未测试）；如果出现下载链接过期的提示页面时**请返回刷新页面重新获取**

  ![下载链接已过有效期](https://gitee.com/oneNorth7/pics/raw/master/picgo/下载链接已过有效期.jpg)

## 使用说明及演示

**必须登录云盘网页版！！！**

**必须登录云盘网页版！！！**

**必须登录云盘网页版！！！**

重要的事情说三遍，注册云盘帐号只是分分钟的事情（**移动、电信、联通手机号**均可）。

脚本已在`Firefox`和`Chrome`、`Edge`下测试通过，暂未发现会与其他脚本冲突的情况。

安装扩展可根据浏览器类别点击下方的链接直达扩展页面：

- Chrome：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)（谷歌商店）、[Tampermonkey](https://www.crx4chrome.com/extensions/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://www.crx4chrome.com/extensions/jinjaccalgkegednnccohejagnlnfdag)（镜像站）

- Firefox：[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) 或 [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)

- Edge：[Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) 或 [暴力猴](https://microsoftedge.microsoft.com/addons/detail/%E6%9A%B4%E5%8A%9B%E7%8C%B4/eeagobfjdenkkddmbclomhiblgggliao)

大多数国产浏览器可到镜像站下载Chrome的扩展文件后拖入扩展管理页面进行安装，对于商店自带的移植版扩展未经测试**不能保证**兼容性，可发反馈或issue一起讨论研究。

* 启用“雷利子”脚本后，未登录帐号时会提示`请先登录，必须登录才能突破下载限制`
  ![未登录时提示请先登录](https://gitee.com/oneNorth7/pics/raw/master/picgo/未登录时提示请先登录.jpg)

* **单文件分享页面**

1. 脚本加载成功后，下载按钮会变成熟悉的绿色的**直接下载**，转存按钮旁“烦人”的提示信息会被隐藏
![单文件不超过大小限制](https://gitee.com/oneNorth7/pics/raw/master/picgo/单文件不超过大小限制.gif)
2. 当文件大小超过**1G**时，会提示`成功突破文件大小下载限制！`，可**直接下载**
    ![单文件超过大小限制](https://gitee.com/oneNorth7/pics/raw/master/picgo/单文件超过大小限制.gif)

* **多文件分享页面**

  多文件分享页请先切换成**列表**显示模式，如下图所示：
  ![切换列表浏览](https://gitee.com/oneNorth7/pics/raw/master/picgo/切换列表浏览.jpg)
1. 脚本加载成功后，文件大小前的**小下载按钮**的提示文字会由`下载`变为`直接下载`，点此小按钮可下载单个文件，当发现提示文字不是`直接下载`时请**刷新页面**重新加载
    ![多文件分享页单个下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/多文件分享页单个下载.gif)

2. 多选文件（可按住`Shift`选中首尾两项进行连选）或全选文件后，点击文件列表上方的**绿色直接下载**按钮，文件数超过10时会弹出确认提示，点击`确定全部下载`后会**逐一下载**；选中的文件夹会被跳过，并提示`选中的文件夹已跳过，请进入目录下载！`
![多文件分享页多选文件直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/%E5%A4%9A%E6%96%87%E4%BB%B6%E5%88%86%E4%BA%AB%E9%A1%B5%E5%A4%9A%E9%80%89%E6%96%87%E4%BB%B6%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BD.gif)

3. 文件夹只有`转存`按钮，需要进入目录下载文件
     ![多文件分享页选中文件屏蔽下载按钮](https://gitee.com/oneNorth7/pics/raw/master/picgo/多文件分享页选中文件屏蔽下载按钮.gif)

* **个人主页**

  **请不要使用目录树**进行目录切换，若使用此功能每次切换目录后**需要手动刷新页面**才能触发突破下载限制的功能，切记！！！
  ![目录树](https://gitee.com/oneNorth7/pics/raw/master/picgo/目录树.jpg)

  脚本成功加载后若为**图标**显示模式会**自动切换**为**列表**显示模式
  ![个人主页自动切换为列表显示模式](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页自动切换为列表显示模式.gif)
  
  若自动切换**不成功**请**手动切换**成**列表**显示模式，如下图所示：
  ![个人主页切换列表浏览](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页切换列表浏览.jpg)
1. 脚本加载成功后，文件大小前的**小下载按钮**的提示文字由`下载`变为`直接下载`，文件和文件夹右键菜单中的`下载`会变为`直接下载`，点此小按钮或右键直接下载可下载单个文件
![个人主页单个下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页单个下载.gif)

2. 多选文件（可按住`Shift`选中首尾两项进行连选）或全选文件后，点击文件列表上方的**绿色直接下载**按钮或者**右键点击直接下载**，文件数超过10时会弹出确认提示，点击`确定全部下载`后会**逐一下载**；选中的文件夹会被跳过，并提示`选中的文件夹已跳过，请进入目录下载！`
   ![个人主页多选文件直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页多选文件直接下载.gif)
   ![个人主页多选文件右键直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页多选文件右键直接下载.gif)

3. 文件夹的小下载按钮的提示文字会由`下载`变为`请进入目录下载!`，点击小下载按钮时会弹出`请进入目录下载！`的提示信息，文件夹右键点击`直接下载`时会弹出`选中为文件夹，请进入目录下载！`的提示信息
     ![个人主页文件夹下载提示](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页文件夹下载提示.gif)

## 进阶技巧

* 使用IDM下载工具，可由软件`菜单栏` -> `下载` -> `选项` -> `下载`选项卡，将`显示开始下载对话框`前的**勾选去掉**，点击下方的`确定`按钮后保存设置，无需再手动点击`开始下载`即可自动下载文件
  
  ![IDM显示开始下载对话框](https://gitee.com/oneNorth7/pics/raw/master/picgo/IDM显示开始下载对话框.jpg)
  
  ![IDM不勾选显示开始下载对话框](https://gitee.com/oneNorth7/pics/raw/master/picgo/IDM不勾选显示开始下载对话框.gif)

* 使用迅雷下载软件（图中是迅雷11，其他版本设置可自行查找），可进入设置，将`一键下载`勾选后返回，同样无需手动点击`立即下载`即可自动下载文件，具体效果可自行设置体验
![迅雷11一键下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/迅雷11一键下载.jpg)

## 更新历史

* V0.3.2 - 新增选中多个文件逐一直接下载功能

* V0.3.1 - 优化多文件分享页直接下载功能

* V0.3.0 - 优化单文件分享页下载按钮选择器；成功加载后自动切换为列表显示模式；优化切换目录后自动突破下载限制功能

* V0.2.9 - 个人主页突破文件大小下载限制；切换目录后自动突破下载限制

* V0.2.8 - 单文件、多文件分享页突破文件大小下载限制


## 关注赞赏

**关注我，不迷路**~~ 第一时间获取更新推送！！！

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/oneNorth7.png" width=500 />

**原创不易，您的支持是我坚持创作的动力**~~

可以通过[爱发电-一个北七](https://afdian.net/@oneNorth7)赞助，也可以直接扫一扫微信赞赏码哦～

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/reward_qrcode.png" width=400 />

2. 或者用支付宝扫一扫红包码或打开支付宝首页搜 `702089817` 领红包支持一下，免费让作者赚个支付宝赏金

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/红包码.jpg" width=400 />

