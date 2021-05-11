# [雷利子](https://github.com/oneNorth7/Cloud189_popper)

![](https://gitee.com/oneNorth7/pics/raw/master/picgo/pentagram-devil.png)

## 原创声明

该脚本的突破原理是通过**自行阅读分析**官网代码获得的，虽然无法实现免登录下载，但突破下载限制也是另一种收获，毕竟我的云盘容量不是很大不支持太多的转存。

## 命名由来

> 隐藏着黑暗力量的钥匙啊,在我面前显示你真正的力量！现在以你的主人，小樱之名命令你——封印解除！

魔卡少女樱变身咒语的日语原台词最后一句为*レリーズ*，即`release`，取谐音*雷利子*，意为释放，中二点就是封印解除。

## 痛点问题

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/下载限制.jpg" alt="下载限制" style="zoom: 80%;" />

天翼云盘**不限下载速度**的特色让人心生向往，但网页版**不支持文件夹、多文件、大于50M的文件**下载，需要**转存**后通过**客户端**下载的限制让很多人望而却步，本人在找寻免登录下载的过程中发现了突破这一限制的方法，此脚本也应运而生。

## 功能描述

- [x] **突破50M文件大小**的下载限制

- [x] **突破多文件**的下载限制

- [x] **突破文件夹**的下载限制

- [x] 支持**单选、多选、全选**文件直接下载

- [x] 新增**逐个下载**文件功能

- [x] 新增逐个下载文件和单个文件夹并复制目录名称功能

- [x] 新增单选文件夹直接下载并复制目录名称功能

- [x] 新增全选文件直接下载并复制上级目录名称功能


## 特别说明

* 取消兼容`Greasemonkey`油猴子扩展，因为跟另外两款油猴插件（Tampermonkey，Violentmonkey）的`API`差异有点大

* **填写密码后为了保证脚本加载成功，会有一次延迟的页面刷新**，**强烈建议**搭配本人写的[链接助手](https://greasyfork.org/zh-CN/scripts/422773-链接助手)使用

* 请使用**IDM**或**浏览器内置下载器**下载，迅雷不支持打包下载
 ![img](https://gitee.com/oneNorth7/pics/raw/master/picgo/%E8%BF%85%E9%9B%B7%E4%B8%8B%E8%BD%BD.jpg) ![img](https://gitee.com/oneNorth7/pics/raw/master/picgo/%E8%BF%85%E9%9B%B7%E4%B8%8B%E8%BD%BD%E6%94%AF%E6%8C%81.jpg) ![img](https://article-fd.zol-img.com.cn/g5/M00/0F/01/ChMkJlqv1laIUgEPAAC3xYYNrN4AAm23ALlmIEAALfd472.jpg)

* 在IDM选项里设置不接管天翼云盘打包链接的下载，设置方法如下：

  在排除的地址列表添加 `https://vdownload.cloud.189.cn/v2multiDownloadFileAction`，确定后保存设置

  ![](https://gitee.com/oneNorth7/pics/raw/master/picgo/IDM添加例外.jpg)

## 使用说明及演示

**必须登录云盘网页版！！！**

**必须登录云盘网页版！！！**

**必须登录云盘网页版！！！**

重要的事情说三遍，注册云盘帐号只是分分钟的事情（**移动、电信、联通手机号**均可）。

脚本已在`Firefox`和`Chrome`、`Edge`下测试通过，暂未发现会与其他脚本冲突的情况；支持单文件分享页面、多文件分享页面或个人主页单选、多选或全选文件**直接下载**；逐个文件直接下载并根据情况复制目录名称。

安装扩展可根据浏览器类别点击下方的链接直达扩展页面：

- Chrome：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)（谷歌商店）、[Tampermonkey](https://www.crx4chrome.com/extensions/dhdgffkkebhmkfjojejmpbldmpobfkfo) 或 [Violentmonkey](https://www.crx4chrome.com/extensions/jinjaccalgkegednnccohejagnlnfdag)（镜像站）

- Firefox：[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) 或 [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)

- Edge：[Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) 或 [暴力猴](https://microsoftedge.microsoft.com/addons/detail/%E6%9A%B4%E5%8A%9B%E7%8C%B4/eeagobfjdenkkddmbclomhiblgggliao)

大多数国产浏览器可到镜像站下载Chrome的扩展文件后拖入扩展管理页面进行安装，对于商店自带的移植版扩展未经测试不能保证兼容性，可发反馈或issue一起讨论研究。

本人郑重声明：**本脚本不存在任何操作或盗取个人Cookie的行为，获取下载链接是调用天翼云官方方法（点击原有下载按钮），只是在调用时突破限制和改变按钮样式（方便识别）而已，欢迎大家监督**。

* 启用“雷利子”脚本后，未登录帐号会提示”**请先登录**，必须登录才能突破下载限制“
  ![请先登录](https://gitee.com/oneNorth7/pics/raw/master/picgo/请先登录.jpg)

* 单文件分享页面

  文件大小超过**50M**时，在页面加载完成片刻后，下载按钮会变成绿色的**直接下载**；转存按钮旁“烦人”的提示信息会被隐藏（无论文件大小）
  ![单文件突破大小限制](https://gitee.com/oneNorth7/pics/raw/master/picgo/单文件突破大小限制.gif)

* 多文件页面的显示模式请先切换成**列表**，如图所示：
	![列表浏览](https://gitee.com/oneNorth7/pics/raw/master/picgo/列表浏览.jpg)

* **多文件分享页面**

1. 文件右侧的**小下载按钮**支持**直接下载**该文件（文件夹或特定类型的文件只有*转存*按钮）；单选或多选文件后点击**直接下载**
   ![单选多选文件直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/单选多选文件直接下载.gif)
2. 点击**全选**按钮稍待片刻后，下载按钮会变成绿色的**直接下载**，可点击此按钮进行下载
   ![全选文件直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/全选文件直接下载.gif)
3. 目录或特定类别的文件右侧没有小下载按钮，可选中后点击上方的**直接下载**按钮
![无小下载按钮](https://gitee.com/oneNorth7/pics/raw/master/picgo/无小下载按钮.jpg)
* 个人主页

  支持单选、多选、全选文件后**直接下载**
![单选多选全选文件直接下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/单选多选全选文件直接下载.gif)

* **逐个下载**和**复制目录名称**功能（演示以多文件分享页面为例，个人主页效果类似）

  1. **逐个下载**按钮仅在当前页面文件数（包括文件夹）大于1且文件夹数小于2时才会显示，换言之只有一个文件（夹）或有多个文件夹时不会显示，切换目录时会根据当前文件列表情况显隐该按钮

     ![逐个下载按钮](https://gitee.com/oneNorth7/pics/raw/master/picgo/逐个下载按钮.gif)

  2. 多个文件（没有文件夹）**逐个下载**（数量超过5时会有确认提示）

     ![逐个文件下载](https://gitee.com/oneNorth7/pics/raw/master/picgo/逐个文件下载.gif)

  3. 只有一个文件夹（有其他文件）**逐个下载**时会复制该目录名称

     ![逐个下载复制单一目录名](https://gitee.com/oneNorth7/pics/raw/master/picgo/逐个下载复制单一目录名.gif)

  4. 单选文件夹**直接下载**时会复制该目录名称

     ![单选目录直接下载复制目录名](https://gitee.com/oneNorth7/pics/raw/master/picgo/单选目录直接下载复制目录名.gif)

  5. 全选文件**直接下载**时会复制上级目录名称（只有一个文件时不复制，只有一个文件夹时复制该目录名称）

     ![全选直接下载复制上级目录名](https://gitee.com/oneNorth7/pics/raw/master/picgo/全选直接下载复制上级目录名.gif)

* **直接下载**按钮适用于单选、多选、全选文件/文件夹下载的情况

* 点选文件后若**很久**都没有出现绿色的**直接下载**按钮，可以尝试点选其他文件或取消或再选中或刷新页面

* 目录**切换过快**时可能导致**逐个下载**按钮不显示或不消失，可以尝试刷新页面（**当页面有多个文件夹而逐个下载按钮还显示的时候请注意，请立即刷新页面，千万别点逐个下载！！！不然点击后弹出的下载文件名称都是`【打包下载】天翼云盘.zip`，无法区分**）

* 个人主页有系统生成的目录（如同步盘、我的图片等等），选中时包含这些目录，此时**直接下载**按钮会是**禁用状态**，点击后会提示“系统生成文件夹，无法直接下载，请进入文件夹下载！”，说明不支持下载该类文件夹，可进入目录后再直接下载
  ![系统生成文件夹](https://gitee.com/oneNorth7/pics/raw/master/picgo/系统生成文件夹.gif)
  
* 目前存在的小bug（不影响下载功能）可参考下面的临时解决方案

## 使用建议

* 强烈建议**单文件下载**，官方返回的**单文件下载链接**支持IDM**多线程**和**续传**下载，速度奇快，文件名也正确
* 打包下载返回的链接的压缩包名固定为`【打包下载】天翼云盘.zip`，并且该链接不支持IDM多线程和续传下载，速度也降下来了
* 有大批量下载文件或文件夹需求的还是建议选择官方客户端下载

## 临时解决方案

* 个人主页下载时，*全部文件* 下的任何文件夹或文件夹下的任意文件被**直接下载**了，重新进入该文件夹时目录导航条中的 *返回上一级* 和 *全部文件* 会消失不见，这时可以直接点击左侧的 *全部文件* 返回，之后这个bug会暂时消失，但再次**直接下载**还是会出现以上问题；这个bug只影响浏览文件，不影响文件下载。具体操作可参考以下动图：
  ![个人主页下载小bug](https://gitee.com/oneNorth7/pics/raw/master/picgo/个人主页下载小bug.gif)

## 更新历史

* V0.2.6 - 优化未登录提醒后自动弹出登录界面的判断

* V0.2.5 - 未登录提醒后自动弹出登录界面；加载超时后自动刷新页面

* V0.2.4 - 优化sweetalert2弹窗提示的背景显示问题

* V0.2.3 - 优化填写密码跳转后页面的自动刷新功能
* V0.2.2 - 修复内容审核不通过页面和天翼云盘主页未登录时脚本加载问题

* V0.2.1 - 修复内容审核不通过页面的脚本加载问题

* V0.2.0 - 优化页面类型判断逻辑

* V0.1.9 - 图标浏览模式自动切换为列表浏览模式

* V0.1.8 - 修复填写密码前后的脚本加载问题

* V0.1.7 - 优化加载机制和速度

* V0.1.6 - 更换图标；新增逐个文件/文件夹直接下载功能；新增打包下载时根据情况复制文件名功能；取消兼容`Greasemonkey`油猴子扩展
* V0.1.5 - 修复`Greasemonkey`油猴子扩展不兼容问题
* V0.1.4 - 修复全选下载问题；修复浏览器兼容问题

## 关注赞赏

**关注我，不迷路**~~ 第一时间获取更新推送！！！

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/oneNorth7.png" style="zoom: 67%;" />

**原创不易，您的支持是我坚持创作的动力**~~

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/reward_qrcode.png" style="zoom: 33%;" />

<img src="https://gitee.com/oneNorth7/pics/raw/master/picgo/支付码.jpg" style="zoom:50%;" />