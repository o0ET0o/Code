﻿define.beforeVue = function () {
    define.screenParam.colDef = [
        { title: '代码', key: 'ID', width: 150 },
        { title: '名称', key: 'NAME', width: 150 },
    ]
    define.screenParam.dataDef = [];

    define.service = "WyglService";
    define.method = "GetComplainDept";
    define.methodList = "GetComplainDept";
    define.Key = 'ID';
}
