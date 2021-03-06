﻿editDetail.beforeVue = function () {

    editDetail.others = false;
    editDetail.branchid = false;
    editDetail.service = "WyglService";
    editDetail.method = "GetWlGoods";
    editDetail.Key = 'GOODSID';
    editDetail.dataParam.STATUS = "1";

    editDetail.screenParam.showPopWLMerchant = false;
    editDetail.screenParam.srcPopWLMerchant = __BaseUrl + "/" + "Pop/Pop/PopWLMerchantList/";
};

editDetail.showOne = function (data, callback) {
    _.Ajax('SearchWlGoods', {
        Data: { GOODSDM: data }
    }, function (data) {
        $.extend(editDetail.dataParam, data.goods);
        editDetail.dataParam.BILLID = data.goods.GOODSDM;
        callback && callback(data);
    });
}


editDetail.clearKey = function () {
    editDetail.dataParam.GOODSDM = null;
    editDetail.dataParam.GOODSID = null;
    editDetail.dataParam.NAME = null;

    editDetail.dataParam.PYM = null;
    editDetail.dataParam.MERCHANTID = null;
    editDetail.dataParam.JXSL = null;
    editDetail.dataParam.TAXINPRICE = null;
    editDetail.dataParam.NOTAXINPRICE = null;
    editDetail.dataParam.USEPRICE = null;
    editDetail.dataParam.DESCRIPTION = null;
}


editDetail.IsValidSave = function () {
    if (!editDetail.dataParam.NAME) {
        iview.Message.info("请输入物料名称!");
        return false;
    };
    if (!editDetail.dataParam.TAXINPRICE) {
        iview.Message.info("请输入含税采购价!");
        return false;
    };
    if (!editDetail.dataParam.JXSL) {
        iview.Message.info("请输入税率!");
        return false;
    };

    editDetail.dataParam.NOTAXINPRICE = (editDetail.dataParam.TAXINPRICE / (1 + editDetail.dataParam.JXSL)).toFixed(4);
    return true;
};

editDetail.otherMethods = {
    SelMerchant: function () {
        editDetail.screenParam.showPopWLMerchant = true;
    },
    Getpym: function () {
        editDetail.dataParam.PYM = editDetail.dataParam.NAME.toPYM().substr(0, 6);
    }
};

editDetail.popCallBack = function (data) {
    if (editDetail.screenParam.showPopWLMerchant) {
        editDetail.screenParam.showPopWLMerchant = false;
        for (var i = 0; i < data.sj.length; i++) {
            editDetail.dataParam.MERCHANTID = data.sj[i].MERCHANTID;
            editDetail.dataParam.MERCHANTNAME = data.sj[i].NAME;
        }
    };
};
