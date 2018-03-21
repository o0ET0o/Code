﻿passWord = new Vue({
    el: "#passWord",
    data () {
        return {
            psw1: "",
            psw2:""
        }
    },
    methods: {
        sure: function () {
            var _self = this;
            if (this.psw1 != this.psw2) {
                iview.Message.info("两次密码不一致!");
                return;
            };
            _.Ajax('ChangePsw', {
                data: { PASSWORD: _self.psw2 }
            }, function (data) {
                iview.Message.info("修改成功!");
            });
        }
    }
});