﻿function _Define() {
    var _this = this;

    //vue之前的操作(主要是实现v-model绑定数据的声明)
    this.beforeVue = function () { }

    //控件是否可用，扩展函数,待完善
    this.enabled = function (val) { return val; }

    //校验保存前数据是否合法,前端验证，非空的可以加上
    this.IsValidSave = function (_self) {
        return true;
    }

    //添加后初始化数据信息
    this.newRecord = function () { }

    //得到主键
    this.Key = undefined

    //vue操作
    this.vue = function VueOperate() {
        var ve = new Vue({
            el: '#def_Main',
            data: {
                //dataParam 数据库交互需要传输的内容
                //screenParam屏幕显示的内容
                dataParam: _this.dataParam,
                screenParam: _this.screenParam,
                disabled: _this.enabled(true),
                _key: {},
            },
            mounted: function () {
                //页面打开先查询左边列表信息
                _.Search({
                    Service: _this.service,
                    Method: _this.methodList,
                    Data: {},
                    Success: function (data) {
                        define.screenParam.dataDef = data.rows;
                    }
                })
            },
            methods: {
                //添加
                add: function (event) {
                    ve._key = define.dataParam[_this.Key] = event,
                    _this.dataParam = {};
                    _this.newRecord();
                    ve.dataParam = _this.dataParam;
                    ve.disabled = _this.enabled(false);
                },
                //修改
                mod: function (event) {
                    ve._key = {};
                    ve._key[_this.Key] = define.dataParam[_this.Key];
                    ve.disabled = _this.enabled(false);
                },
                //保存
                save: function (event) {
                    var _self = this;
                    if (!_this.IsValidSave(_self))
                        return;
                    _.Ajax('Save', {
                        DefineSave: ve.dataParam
                    }, function (callback) {
                        //callback 返回的是主键
                        var backKey = callback;
                        var elementKey = {};
                        elementKey[_this.Key] = callback;
                        //返回左边列表
                        _.Search({
                            Service: _this.service,
                            Method: _this.methodList,
                            Data: {},
                            Success: function (data) {
                                define.screenParam.dataDef = data.rows;
                                //返回右边元素
                                _.Search({
                                    Service: _this.service,
                                    Method: _this.method,
                                    Data: elementKey,
                                    Success: function (data) {
                                        _this.dataParam = data.rows[0];
                                        ve.dataParam = _this.dataParam;
                                        ve.disabled = _this.enabled(true);
                                        _self.$Message.info("保存成功");
                                    }
                                });
                            }
                        })


                    });
                },
                quit: function (event) {
                    if (ve._key) {
                        this.$Modal.confirm({
                            title: '提示',
                            content: '是否取消',
                            onOk: function () {
                                //取消后查原来的元素列表
                                _.Search({
                                    Service: _this.service,
                                    Method: _this.method,
                                    Data: ve._key,
                                    Success: function (data) {
                                        _this.dataParam = data.rows[0];
                                        ve.dataParam = _this.dataParam;
                                    }
                                });
                                ve.disabled = _this.enabled(true);
                            },
                            onCancel: function () {
                                ve.disabled = _this.enabled(false);
                                this.id = "关闭"
                            }
                        });
                    }
                    else {
                        ve.disabled = _this.enabled(true);
                    }

                },
                //删除
                del: function (event) {
                    var _self = this;
                    this.$Modal.confirm({
                        title: '提示',
                        content: '是否删除',
                        onOk: function () {
                            _.Ajax('Delete', {
                                DefineDelete: ve.dataParam
                            }, function (data) {
                                _.Search({
                                    Service: _this.service,
                                    Method: _this.methodList,
                                    Data: {},
                                    Success: function (data) {
                                        define.screenParam.dataDef = data.rows;
                                    }
                                })
                                //删除完,界面清空
                                _this.dataParam = {};
                                ve.dataParam = _this.dataParam;
                                _self.$Message.info("删除成功");
                            });
                        },
                        onCancel: function () {
                            this.id = "关闭"
                        }
                    });
                    ve.disabled = _this.enabled(true);
                },
                //列表选中
                //参数:currentRow当前数据
                //oldCurrentRow上一次选中的数据
                currentData: function (currentRow, oldCurrentRow) {
                    _this.dataParam = currentRow;
                    var data = {};
                    data[_this.Key] = define.dataParam[_this.Key];
                    _.Search({
                        Service: _this.service,
                        Method: _this.method,
                        Data: data,
                        Success: function (callback) {
                            _this.dataParam = callback.rows[0];
                            ve.dataParam = _this.dataParam;
                        }
                    });
                }
            }
        });
    }

    //初始化vue绑定的对象
    this.vueInit = function () {
        _this.dataParam = {};
        _this.screenParam = {};
        _this.service = "";
        _this.method = "";
        _this.methodList = "";
    }

    //延时
    setTimeout(function () {
        _this.vueInit();
        _this.beforeVue();
        _this.vue();
    }, 200);
}
var define = new _Define();