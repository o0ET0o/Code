﻿function _EditDetail() {

    var _this = this;

    this.beforeVue = function () { }

    this.IsValidSave = function () {
        return true;
    }

    this.popCallBack = function (data) { };
    this.enabled = function (val) { return val; }

    this.clearKey = function () { }
    //添加后初始化数据信息
    this.newRecord = function () { }
    this.mountedInit = function () { };

    this.vue = function VueOperate() {
        var options = {
            el: '#EditDetail',
            data: {
                dataParam: _this.dataParam,
                screenParam: _this.screenParam,
                panelName: 'base',
                branchid: _this.branchid,
                others: _this.others,
                disabled: _this.enabled(true),
            },
            mounted: function () {
                _this.mountedInit();
            },
            methods: {
                add: function (event) {
                    _this.dataParam.BILLID = null;
                    _this.clearKey();
                    _this.newRecord();
                    ve.dataParam = _this.dataParam;
                    this.$set(ve.dataParam, _this.dataParam);

                },
                save: function (event) {
                    var _self = this;
                    if (!_this.IsValidSave(_self))
                        return;
                    save(function (data) {
                        _this.showOne(data, function () {
                            ve.dataParam = _this.dataParam;
                            _self.$Message.info("保存成功");
                        });
                    })
                },
            }
        };
        _this.otherMethods && $.extend(options.methods, _this.otherMethods);
        var ve = new Vue(options);
        _this.veObj = ve;
        function save(callback) {
            _.Ajax('Save', {
                SaveData: ve.dataParam
            }, function (data) {
                callback && callback(data);
            });
        }
    }

    this.showOne = function (data, callback) {
    }

    this.vueInit = function () {
        _this.dataParam = {};
        _this.screenParam = {};
        _this.service = "";
        _this.method = "";
        _this.branchid = true;
        _this.others = true;
    };

    setTimeout(function () {
        _this.vueInit();
        _this.beforeVue();
        _this.vue();
        if (editDetail.Id) {
            editDetail.showOne(editDetail.Id);
        }
    }, 500);
}
var editDetail = new _EditDetail();