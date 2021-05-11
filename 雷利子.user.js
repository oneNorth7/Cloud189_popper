// ==UserScript==
// @name        雷利子
// @namespace   https://github.com/oneNorth7/Cloud189_popper
// @version     0.2.6
// @author      一个北七
// @description 简单突破天翼云盘网页版文件下载的大小, 多文件, 文件夹限制; 单选、多选、全选文件直接下载; 逐个文件直接下载并根据情况复制目录名称
// @icon        https://gitee.com/oneNorth7/pics/raw/master/picgo/pentagram-devil.png
// @created     2021/3/13 下午6:23:05
// @include     http*://cloud.189.cn/*
// @compatible  chrome 69+
// @compatible  firefox 78+
// @compatible  edge Latest
// @noframes
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.all.min.js
// @run-at      document-end
// @grant       unsafeWindow
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// ==/UserScript==

void function() {
    'use strict';
    const sizeLimit = 50 * 1<<10 * 1<<10;
    const buttonText = '\u76f4\u63a5\u4e0b\u8f7d';
    const buttonStyle = {'background-color': '#36BE63', 'color': 'white'};
    
    let t = {
        clog() {
            console.group('[\u96f7\u5229\u5b50]');
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
            let isFollowed = this.get('isFollowed', false), least_times = this.get('least_times', 30);
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
                            this.set('isFollowed', true);
                          } else this.set('least_times', least_times + 30);
                        });
            } else flag = true;
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
    
    let success_times = t.get("success_times"), flag = false;
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
                } else if (void 0 !== unsafeWindow.appRouter && unsafeWindow.appRouter.mainView) {
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
                return '\u6210\u529f\u7a81\u7834\u6587\u4ef6\u5927\u5c0f\u9650\u5236\uff01';
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
                        t.info('\u5c01\u5370\u89e3\u9664\uff01', '\u5df2\u5c06\u5355\u4e00\u76ee\u5f55\u540d\u590d\u5236\u5230\u526a\u8d34\u677f\uff01', 'success');
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
                    t.info('\u5c01\u5370\u89e3\u9664\uff01', '\u5df2\u5c06\u5355\u4e00\u76ee\u5f55\u540d\u590d\u5236\u5230\u526a\u8d34\u677f\uff01', 'success');
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
                          title: '\u6587\u4ef6\u6570\u91cf\u8d85\u8fc75',
                          html: '<p style="color: red">\u662f\u5426\u5168\u90e8\u9010\u4e00\u4e0b\u8f7d\uff1f</p>',
                          icon: 'warning',
                          showCancelButton: true,
                          allowOutsideClick: false,
                          confirmButtonColor: '#d33',
                          confirmButtonText: '\u786e\u5b9a\u5168\u90e8\u4e0b\u8f7d',
                          cancelButtonColor: '#3085d6',
                          cancelButtonText: '\u53d6\u6d88\u4e0b\u8f7d',
                        }).then((result) => {
                          if (result.isConfirmed) {
                              directDownload();
                              t.info('\u5c01\u5370\u89e3\u9664\uff01', '\u5168\u90e8\u6587\u4ef6\u5f00\u59cb\u9010\u4e00\u4e0b\u8f7d', 'success');
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
                        t.info('\u7cfb\u7edf\u751f\u6210\u6587\u4ef6\u5939', '\u65e0\u6cd5\u76f4\u63a5\u4e0b\u8f7d\uff0c\u8bf7\u8fdb\u5165\u6587\u4ef6\u5939\u4e0b\u8f7d\uff01');
                        return ;
                    }
                    if (fileIdList) {
                        if (fileIdList.includes(',') ) {
                            msg += '\u6210\u529f\u7a81\u7834\u6587\u4ef6\u6570\u91cf\u9650\u5236\uff01';
                        } else {
                            msg += this.breakSingleSize(fileList.selected()[0]);
                        }
                    }
                    if (this.isFolderSelected()) msg = msg ? msg.replace('\u9650\u5236', '\u548c\u6587\u4ef6\u5939\u9650\u5236') : '\u6210\u529f\u7a81\u7834\u6587\u4ef6\u5939\u9650\u5236\uff01';
                    break;
                case 1:
                        msg += '\u6210\u529f\u7a81\u7834\u6587\u4ef6\u5927\u5c0f\u9650\u5236\uff01';
                    break;
            }
            t.increase();
            if (msg) t.info('\u5c01\u5370\u89e3\u9664\uff01', msg, 'success');
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
                    this.newButton = $('<a href="javascript:;" id="J_download1by1" class="btn" style="background-color: #f0424f; color: white; width: 80px; margin-right: 10px">\u9010\u4e2a\u4e0b\u8f7d</a>');
                    operate.before(this.newButton);
                }
                
                let bar = $('div.toolbar>.btn-group');
                if (bar.length && !$('#J_download1by1').length) {
                    this.newButton = $('<a href="javascript:;" id="J_download1by1" class="btn" style="background-color: #f0424f; color: white">\u9010\u4e2a\u4e0b\u8f7d</a>');
                    bar.append(this.newButton);
                }
                
                $('#J_download1by1').on('click', () => {
                   this.download1by1();
                });
                
            } else if (newButton) newButton.remove();
            
            this.hideTip();
        },
        
        changeButton() {
            let panType = this.getPanType();
            switch(panType) {
                case 0:
                    if ($('#J_SwitchMode').text() == '\u5217\u8868') $('#J_SwitchMode')[0].click();
                    this.changeStyleZero();
                    break;
                case 1:
                    this.changeStyleOne();
                    break;
                case 2:
                    if ($('span.J_DropdownToggleContent').text() == '\u56fe\u6807') $('#J_ListMode')[0].click();
                    this.changeStyleTwo()
                    break;
            }
        },
        
        isLogin() {
            return unsafeWindow.application && unsafeWindow.application.headerView.isLogin;
        },
        
        init() {
            if (!$('#code_txt').length) {
                $('#J_Notify').css('z-index', 1010);
                setTimeout(() => {
                    let count = 0, result;
                    let tid = setInterval(() => {
                        count++;
                        result = unsafeWindow.fileId || unsafeWindow.appRouter || unsafeWindow.mainView;
                        if ($('div.login-pannel').length > 0 || $('div.error-content').length > 0) {
                            clearInterval(tid);
                        } else if (this.isLogin() && result) {
                            this.changeButton();
                            clearInterval(tid);
                            t.clog('\u52a0\u8f7d\u6210\u529f\uff01');
                            if (flag) t.info('\u96f7\u5229\u5b50','\u5c01\u5370\u89e3\u9664\uff01', 'success');
                        } else if (this.isLogin() === false) {
                            clearInterval(tid);
                            Swal.fire('\u8bf7\u5148\u767b\u5f55\uff01', '\u5fc5\u987b\u767b\u5f55\u624d\u80fd\u7a81\u7834\u4e0b\u8f7d\u9650\u5236', 'info')
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        let account = $('#J_UserAccount');
                                        if (account.text() == '\u767b\u5f55') account.click();
                                    }
                                });
                            $('body').removeClass('swal2-height-auto');
                        }
                        
                        if (count == 5) {
                            clearInterval(tid);
                            Swal.fire('\u96f7\u5229\u5b50', '\u52a0\u8f7d\u8d85\u65f6\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5\uff01', 'error')
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                });
                            $('body').removeClass('swal2-height-auto');
                        }
                    }, 1000);
                }, 1000);
            } else {
                t.info('\u63a8\u8350\u4f7f\u7528<\u94fe\u63a5\u52a9\u624b>', '\u81ea\u52a8\u586b\u5199\u7f51\u76d8\u5bc6\u7801');
                $('a.btn-primary').click(() => {
                    setTimeout(() => { if ($('div.file-item-container').children().length) location.reload(); }, 500);
                });
                
                $('#code_txt').one('focus', () => {
                    if ($('div.link-helper').length) $('div.link-helper').show();
                    else $('div.access-code-item').append('<div class="link-helper tips-save-box" style="left:50px;top:200px;visibility:visible;position:absolute;display:inline-block;"><p style="font-size:16px;">\u8bd5\u8bd5\u80fd\u81ea\u52a8\u586b\u5199\u7f51\u76d8\u5bc6\u7801\u7684\ud83d\udc49<a target="_blank" href="https://greasyfork.org/zh-CN/scripts/422773-%E9%93%BE%E6%8E%A5%E5%8A%A9%E6%89%8B" style="color:#36BE63;position:relative;display:inline;top:0;left:0;text-decoration:underline;">\u94fe\u63a5\u52a9\u624b</a></p><img src="../source/images/tips_save.png"><a href="javascript:;" title="\u5173\u95ed"></a></div>');
                });
            }
        },
    };
    
    main.init();
    
}();