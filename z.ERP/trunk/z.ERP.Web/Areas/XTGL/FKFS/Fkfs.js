﻿define.beforeVue = function () {
    define.screenParam.colDef = [
        { title: '代码', key: 'ID', width: 150 },
        { title: '名称', key: 'NAME', width: 150 },
    ]
    define.screenParam.dataDef = [];

    define.service = "XtglService";
    define.method = "GetFkfs";
    define.methodList = "GetFkfs";
}


define.getKey = function (data) {
    if (typeof (data) == "undefined") {
        return { ID: define.dataParam.ID }
    }
    else {
        return { ID: data }
    }
}

//define.search = function ()
//{
//    _.Search({
//        Service: "XtglService",
//        Method: "GetFkfs",
//        Data: {},
//        Success: function (data) {
//            define.screenParam.dataDef = data.rows;
//        }
//    })
//}