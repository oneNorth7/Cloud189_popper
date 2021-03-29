// ==UserScript==
// @name        雷利子
// @namespace   https://github.com/oneNorth7/Cloud189_popper
// @version     0.1.6
// @author      一个北七
// @description 简单突破天翼云盘网页版文件下载的大小, 多文件, 文件夹限制; 单选、多选、全选文件直接下载; 逐个文件直接下载并根据情况复制目录名称
// @icon        https://gitee.com/oneNorth7/pics/raw/master/picgo/pentagram-devil.png
// @created     2021/3/13 下午6:23:05
// @include     http*://cloud.189.cn/*
// @noframes
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.all.min.js
// @run-at      document-end
// @grant       unsafeWindow
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// @note        V0.1.6    更换图标；新增逐个文件/文件夹直接下载功能；新增打包下载时根据情况复制文件名功能
// ==/UserScript==

void function() {
    'use strict';
    const sizeLimit = 50 * 1<<10 * 1<<10;
    const buttonText = '\u76f4\u63a5\u4e0b\u8f7d';
    const buttonStyle = {'background-color': '#36BE63', 'color': 'white'};
    
    let t = {
        clog(msg) {
                console.group('[雷利子]');
                for (let m of arguments) {
                    if (void 0 !== m) console.log(m);
                }
                console.groupEnd();
        },
        
        set(name, value) {
            GM_setValue(name, value);
        },
        
        get(name, def) {
            return GM_getValue(name, def);
        },
        
        registerMenu(title, func) {
            return GM_registerMenuCommand(title, func);
        },
        
        copy(text, type='text/plain') {
            GM_setClipboard(text, type);
        },
        
        increase() {
            success_times = +this.get("success_times") + 1;
            this.set("success_times", success_times);
        },

        subscribe() {
            let isFollowed = t.get('isFollowed', false), least_times = t.get('least_times', 100);
            success_times = +this.get("success_times");
            if (success_times > least_times && !isFollowed) {
                Swal.fire({
                          title: '\u5173\u6ce8\u516c\u4f17\u53f7\uff0c\u4e0d\u8ff7\u8def\uff01',
                          html: $(
                        `<div><img style="width: 300px;margin: 5px auto;" src="https://gitee.com/oneNorth7/pics/raw/master/picgo/oneNorth7.png"><p style="font-size: 16px;color: red;">\u7b2c\u4e00\u65f6\u95f4\u83b7\u53d6\u66f4\u65b0\u63a8\u9001\uff01\uff01\uff01</p></div>`
                    )[0],
                          showCancelButton: true,
                          allowOutsideClick: false,
                          confirmButtonColor: '#d33',
                          confirmButtonText: '\u5df2\u5173\u6ce8\uff0c\u4e0d\u518d\u63d0\u9192\uff01',
                          cancelButtonColor: '#3085d6',
                          cancelButtonText: '\u7a0d\u540e\u5173\u6ce8',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: '\u611f\u8c22\u5173\u6ce8\uff01\uff01\uff01',
                              text: '\u4e00\u4e2a\u5317\u4e03\u4f1a\u7ee7\u7eed\u4e0d\u9057\u4f59\u529b\u5730\u521b\u4f5c\u66f4\u591a\u5b9e\u7528\u5de5\u5177',
                              showConfirmButton: false,
                              timer: 2000
                            });
                            t.set('isFollowed', true);
                          } else t.set('least_times', least_times + 50);
                        });
            }
        },
        
        info(title, text, icon='info', position='top', timer=2000) {
            Swal.fire({
                      position,
                      icon,
                      toast: true,
                      title,
                      text,
                      showConfirmButton: false,
                      timer
                    });
        },
    };
    
    let success_times = t.get("success_times");
    if (!success_times || isNaN(success_times)) t.set("success_times", 0);
    t.subscribe();
    
    let main = {
        enableButton: function() {
            $('.download-link').removeClass('disable');
            $('.btn-download').removeClass('disable');
        },
        
        getPanType() {
            if (void 0 === this.panType) {
                if (void 0 !== unsafeWindow.mainView) {
                    return this.panType = 0;
                } else if (void 0 !== unsafeWindow.appRouter) {
                    return this.panType = 2;
                } else {
                    return this.panType = 1;
                }
            } else return this.panType;
        },
        
        getView() {
            let panType = this.getPanType();
            switch(panType) {
                case 0:
                    return unsafeWindow.mainView.fileListTabObj[unsafeWindow.mainView.options.fileId].fileListView;
                case 1:
                    return null;
                case 2:
                    return unsafeWindow.appRouter.mainView;
            }
        },
        
        getFileList() {
            let panType = this.getPanType();
            switch(panType) {
                case 0:
                    return unsafeWindow.mainView.fileListTabObj[unsafeWindow.mainView.options.fileId].fileList;
                case 1:
                    return null;
                case 2:
                    return unsafeWindow.appRouter.mainView.fileList;
            }
        },
        
        breakSingleSize(m) {
            let fileSize = m.attributes.firstFileSize || m.attributes.originFileSize;
            if (fileSize >= sizeLimit) {
                if (void 0 !== m.attributes.firstFileSize) m.attributes.firstFileSize = sizeLimit - 1;
                else m.attributes.originFileSize = sizeLimit - 1;
                return '成功突破文件大小限制!';
            }
            return '';
        },
        
        getFileIdList(view) {
            return view && ( view.getFileIdList && view.getFileIdList() || view.collection && view.collection.getFileIdList() );
        },
        
        securityOn() {
            if (void 0 !== unsafeWindow.mainView)
                unsafeWindow.mainView.options.isSecurity = true;
        },
        
        isFolderSelected() {
            let s = this.getFileList().selected();
            return s.some( i => i.attributes.isFolder );
        },
        
        getSelectedFolderName() {
            let models = this.getFileList().selected(), folder = [];
            for (let i of models) {
                if (i.attributes.isFolder) {
                    if (folder.length > 1) break;
                    folder.push(i.attributes.fileName);
                }
            }
            return folder;
        },
        
        getFolderName() {
            let models = this.getFileList().models, folder = [];
            for (let i of models) {
                if (i.attributes.isFolder) {
                    if (folder.length > 1) break;
                    folder.push(i.attributes.fileName);
                }
            }
            return folder;
        },
        
        copyFolderName() {
            let name = '';
            if ($('a.J_Download.disable').length < 1) {
                let selected = this.getSelectedFolderName();
                if (selected.length == 1) {
                    name = selected[0];
                }
                
                if ($('div.file-list-hd>.col-checkboxed').length && this.getFileList().selected().length > 1) {
                    name = $('.breadcrumb em').text(); 
                }
                
                if (name) {
                    t.copy(name);
                    setTimeout(() => {
                        t.info('封印解除！', `已将目录名复制到剪贴板!`, 'success');
                    }, 2000);
                }
            }
        },
        
        download1by1() { 
            let downloadLink = $('div.file-item-container:visible>.file-item'), timeout = 1000,
            directDownload = () => {
                for (let l of downloadLink) {
                    setTimeout(() => {
                        l.click();
                        $('a.J_Download, #J_Download')[0].click();
                    }, timeout);
                    timeout += 1000;
                }
                
                let name = this.getFolderName();
                if (name.length == 1) {
                    t.copy(name[0]); 
                    t.info('封印解除！', `已将单一目录名复制到剪贴板!`, 'success');
                }
                
                setTimeout(() => {
                    $('div.col-checkboxed').removeClass('col-checkboxed');
                    $('div.ui-selected').removeClass('ui-selected');
                    this.getFileList().selected()[0].attributes.selected = false;
                    $('div.selected-count>span').text(0);
                    $('div.btn-group').hide();
                }, timeout);
            }
            
            if (downloadLink.length <= 5) {
                directDownload();
            } else {
                Swal.fire({
                          title: '文件数量超过5',
                          html: `<p style="color: red">是否全部逐一下载？</p>`,
                          icon: 'warning',
                          showCancelButton: true,
                          allowOutsideClick: false,
                          confirmButtonColor: '#d33',
                          confirmButtonText: '确定全部下载',
                          cancelButtonColor: '#3085d6',
                          cancelButtonText: '取消下载',
                        }).then((result) => {
                          if (result.isConfirmed) {
                              directDownload();
                              t.info('封印解除！', '全部文件开始逐一下载', 'success');
                          }
                        });
            }
        },
        
        showInfo() {
            let view = this.getView(),
                fileIdList = this.getFileIdList(view),
                fileList = this.getFileList(),
                panType = this.getPanType(),
                msg = '';
            switch(panType) {
                case 0:
                case 2:
                    if ($('a.J_Download').hasClass('disable')) {
                        t.info('系统生成文件夹', '无法直接下载，请进入文件夹下载！');
                        return ;
                    }
                    if (fileIdList) {
                        if (fileIdList.includes(',') ) {
                            msg += '成功突破文件数量限制!';
                        } else {
                            msg += this.breakSingleSize(fileList.selected()[0]);
                        }
                    }
                    if (this.isFolderSelected()) msg = msg ? msg.replace('限制', '和文件夹限制') : '成功突破文件夹限制!';
                    break;
                case 1:
                        msg += '成功突破文件大小限制!';
                    break;
            }
            t.increase();
            if (msg) t.info('封印解除！', msg, 'success');
        },
        
        hideTip() {
            $('div.tips-save-box').hide();
        },
        
        changeStyleOne() {
            if (unsafeWindow.fileSize >= sizeLimit) {
                this.enableButton();
                $('a.download-link').css(buttonStyle).text(buttonText);
                this.showInfo();
            }
            this.hideTip();
        },
        
        changeStyleTwo() {
            $('div.file-item').on('click', () => {
                            $('#J_Download').css(buttonStyle).text(buttonText);
                            this.hideTip();
            });
            
            $('.file-list-hd .col-checkbox').on('click', () => {
                        setTimeout(() => {
                            $('#J_Download').css(buttonStyle).text(buttonText);
                            this.hideTip();
                        }, 2000);
            });
            
            this.addListener();
        },
        
        changeStyleZero() {
            $('.file-item-container>.file-item').on('click', () => {     
                        $('.file-list-container div.btn-group .dropdown').css('width','320px');
                        $('a.J_Download').css(buttonStyle).text(buttonText);
            });
            
            $('.file-list-hd .col-checkbox').on('click', () => {
                    setTimeout(() => {
                        $('.file-list-container div.btn-group .dropdown').css('width','320px');
                        $('a.J_Download').css(buttonStyle).text(buttonText);
                    }, 2000);
            });
            
            this.addListener();
        },
        
        addListener() {
            $('a.J_Download, #J_Download').on('click', () => {
                this.enableButton();
                this.securityOn();
                this.copyFolderName();
                this.showInfo();
            });
            
            $('div.file-item-container a.download-link').on('click', (obj) => {
                $(obj.target).parents('div.file-item').click();
                $('a.J_Download, #J_Download')[0].click();
            });
            
            $('a.open-link, ul.breadcrumb a').on('click', () => {
                setTimeout(() => {
                    this.changeButton();
                }, 1000);
                this.addButton();
            });
            
            $('a.allfile').on('click', () => {
                setTimeout(() => {
                    this.addButton();
                }, 1000);
            });
            
            this.addButton();
        },
        
        addButton() {
            let downloadLink = $('div.file-item-container:visible>.file-item');
            let newButton = this.newButton, name = this.getFolderName();
            
            if (downloadLink.length > 1 && name.length <= 1) {
                let operate = $('a.btn-save-as');
                if (operate.length && !$('#J_download1by1').length) {
                    this.newButton = $('<a href="javascript:;" id="J_download1by1" class="btn" style="background-color: #f0424f; color: white; width: 80px; margin-right: 10px">逐个下载</a>')
                    operate.before(this.newButton);
                }
                
                let bar = $('div.toolbar>.btn-group');
                if (bar.length && !$('#J_download1by1').length) {
                    this.newButton = $('<a href="javascript:;" id="J_download1by1" class="btn" style="background-color: #f0424f; color: white">逐个下载</a>')
                    bar.append(this.newButton);
                }
                
                $('#J_download1by1').on('click', () => {
                   this.download1by1();
                });
                
            } else if (newButton) newButton.remove();
            
        },
        
        changeButton() {
            let panType = this.getPanType();
            switch(panType) {
                case 0:
                    this.changeStyleZero();
                    break;
                case 1:
                    this.changeStyleOne();
                    break;
                case 2:
                    this.changeStyleTwo()
                    break;
            }
        },
        
        isLogin() {
            return unsafeWindow.application.headerView.isLogin;
        },
        
        init() {
            setTimeout(() => {
                if (this.isLogin()) {
                    this.changeButton();
                    t.clog('加载成功!');
                } else {
                    Swal.fire('请先登录!', '必须登录才能突破下载限制', 'error');
                }
            }, 2500);
        },
    };
    
    main.init();
    
}();