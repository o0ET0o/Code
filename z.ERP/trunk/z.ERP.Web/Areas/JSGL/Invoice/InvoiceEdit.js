﻿var Numbers = true;
editDetail.beforeVue = function () {
    editDetail.branchid = false;
    editDetail.Key = 'INVOICEID';
    editDetail.others = false;
    editDetail.service = "JsglService";
    editDetail.method = "GetInvoiceList";
    editDetail.screenParam.showPopMerchant = false;
    editDetail.screenParam.srcPopMerchant = __BaseUrl + "/" + "Pop/Pop/PopMerchantList/";
}
editDetail.otherMethods = {
    SelMerchant: function () {
        editDetail.screenParam.showPopMerchant = true;
    },
    NUMBERChange: function (value) {
        var ID = editDetail.dataParam.BILLID;
        var Number = editDetail.dataParam.INVOICENUMBER;
        _.Ajax('ShowOneInvoiceEdit', {
            Data: { INVOICENUMBER: Number }
        }, function (data) {
            if (data.Invoice != null) {
                if (data.Invoice.INVOICENUMBER == Number && data.Invoice.INVOICEID != ID) {
                    iview.Message.info("发票号码重复!");
                    Numbers = false;
                } else {
                    Numbers = true;
                }
            } else {
                Numbers = true;
            }
        });
    }
}
editDetail.showOne = function (data, callback) {
    _.Ajax('ShowOneInvoiceEdit', {
        Data: { INVOICEID: data }
    }, function (data) {
        $.extend(editDetail.dataParam, data.Invoice);
        editDetail.dataParam.BILLID = data.Invoice.INVOICEID;
        Vue.set(editDetail.dataParam, 'TYPE', parseInt(data.Invoice.TYPE));
        Vue.set(editDetail.dataParam, data.Invoice);
        callback && callback(data);
    });
}
editDetail.popCallBack = function (data) {

    if (editDetail.screenParam.showPopMerchant) {
        editDetail.screenParam.showPopMerchant = false;
        for (var i = 0; i < data.sj.length; i++) {
            editDetail.dataParam.MERCHANTID = data.sj[i].MERCHANTID;
            editDetail.dataParam.MERCHANTNAME = data.sj[i].NAME;
        }
    }
};
editDetail.clearKey = function () {
    editDetail.dataParam.INVOICENUMBER = null;
    editDetail.dataParam.TYPE = null;
    editDetail.dataParam.MERCHANTID = null;
    editDetail.dataParam.MERCHANTNAME = null;
    editDetail.dataParam.INVOICEAMOUNT = null;
    editDetail.dataParam.VATAMOUNT = null;
    editDetail.dataParam.INVOICEDATE = null;
    editDetail.dataParam.CREATENAME = null;
}
editDetail.IsValidSave = function () {
    if (!Numbers) {
        iview.Message.info("发票号码重复!");
        return false;
    };
    if (!editDetail.dataParam.INVOICENUMBER) {
        iview.Message.info("请输入发票号码!");
        return false;
    };
    if (!editDetail.dataParam.TYPE) {
        iview.Message.info("请确认发票类型!");
        return false;
    };
    if (!editDetail.dataParam.MERCHANTID) {
        iview.Message.info("请确认商户!");
        return false;
    };
    if (!editDetail.dataParam.INVOICEAMOUNT) {
        iview.Message.info("请输入发票金额!");
        return false;
    };
    if (!editDetail.dataParam.VATAMOUNT) {
        iview.Message.info("请输入增值税金额!");
        return false;
    };
    if (!editDetail.dataParam.INVOICEDATE) {
        iview.Message.info("请确认开票日期!");
        return false;
    };

    return true;
}