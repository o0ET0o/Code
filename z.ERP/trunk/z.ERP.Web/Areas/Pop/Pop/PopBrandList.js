﻿search.beforeVue = function () {
    var col = [        
        { title: '品牌代码', key: 'ID', width: 150, },
        { title: '品牌名称', key: 'NAME', width: 150, },
    ];
    search.screenParam.colDef = col.concat(search.colMul);
    search.service = "XtglService";
    search.method = "GetBrandData";
}


//获取父页面参数
search.popInitParam = function (data) {
    if (data) {
        search.searchParam.MERCHANTID = data.MERCHANTID;
        search.searchParam.CONTRACTID = data.CONTRACTID;
    }
}