﻿editDetail.beforeVue = function () {

    editDetail.others = true;
    editDetail.branchid = true;
    editDetail.service = "HtglService";
    editDetail.method = "GetContract";
    editDetail.Key = 'CONTRACTID';
    editDetail.dataParam.STATUS = "1";
    editDetail.dataParam.othersName = "品牌商铺信息";

    editDetail.screenParam.colDefPP = [
    {
        title: "品牌代码", key: 'BRANDID', width: 100,
        render: function (h, params) {
            return h('Input', {
                props: {
                    value: params.row.BRANDID
                },
                on: {
                    'on-enter': function (event) {
                        _self = this;
                        editDetail.dataParam.CONTRACT_BRAND[params.index].BRANDID = event.target.value;

                        _.Ajax('GetBrand', {
                            Data: { ID: event.target.value }
                        }, function (data) {
                            Vue.set(editDetail.dataParam.CONTRACT_BRAND[params.index], 'NAME', data.dt.NAME);
                        });
                    }
                },
            })
        },
    },
    { title: '品牌名称', key: 'NAME', width: 200 },
    {
        title: '操作',
        key: 'action',
        width: 80,
        align: 'center',
        render: function (h, params) {
            return h('div',
                [
                h('Button', {
                    props: { type: 'primary', size: 'small', disabled: false, icon: "minus-circled" },

                    style: { marginRight: '50px' },
                    on: {
                        click: function (event) {
                            editDetail.dataParam.CONTRACT_BRAND.splice(params.index, 1);
                        }
                    },
                }, '删除')
                ]);
        }
    }
    ];

    editDetail.screenParam.colDefSHOP = [
    //{ title: '单元ID', key: 'SHOPID', width: 100 },
    {
        title: "单元代码", key: 'CODE', width: 100,
        render: function (h, params) {
            return h('Input', {
                props: {
                    value: params.row.CODE
                },
                on: {
                    'on-enter': function (event) {
                        _self = this;
                        editDetail.dataParam.CONTRACT_SHOP[params.index].CODE = event.target.value;
                        _.Ajax('GetShop', {
                            Data: { CODE: event.target.value }
                        }, function (data) {
                            Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'SHOPID', data.dt.SHOPID);
                            Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYID', data.dt.CATEGORYID);
                            Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYCODE', data.dt.CATEGORYCODE);
                            Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYNAME', data.dt.CATEGORYNAME);
                        });
                    }
                },
            })
        },
    },
    //{ title: '业态ID', key: 'CATEGORYID', width: 100 },
    { title: '业态代码', key: 'CATEGORYCODE', width: 100 },
    { title: '业态名称', key: 'CATEGORYNAME', width: 100 },
    {
        title: '操作',
        key: 'action',
        fixed: 'rigth',
        width: 80,
        align: 'center',
        render: function (h, params) {
            return h('div',
                [
                h('Button', {
                    props: { type: "primary", size: "small", disabled: false, icon: "minus-circled" },
                    style: { marginRight: '50px' },
                    on: {
                        click: function (event) {
                            editDetail.dataParam.CONTRACT_SHOP.splice(params.index, 1);
                        }
                    },
                }, '删除')
                ]);
        }
    }
    ];

    editDetail.screenParam.colDefRENT = [
       { title: '时间段', key: 'INX', width: 100 },
       {
            title: '开始日期',
            key: 'STARTDATE',
            width: 170,
            render: function (h, params)
            {
                return h('DatePicker',{
                    props:{
                        value: params.row.STARTDATE
                    },
                    on:{
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'STARTDATE', event);
                        }
                    },
                })
            },
        },
        {
           title: '结束日期',
           key: 'ENDDATE',
           width: 170,
           render: function (h, params) {
               return h('DatePicker', {
                   props: {
                       value: params.row.ENDDATE
                   },
                   on: {
                       'on-change': function (event) {
                           Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'ENDDATE', event);
                       }
                   },
               })
           },
        },
 
        {
            title: '单价类型',
            key: 'DJLX',
            width: 150,
            render: function(h, params){
                return h('Select',{
                    props:{
                        value:params.row.DJLX
                    },
                    on:{
                        'on-change':function(event){
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'DJLX', event);
                        }
                    }},
                    [ h('Option', {props: {value: '1'} }, '建筑面积'),
                      h('Option', {props: {value: '2'} }, '租用面积')
                    ],
                )}
        },

        {
            title: "单价", key: 'PRICE', width: 100,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.PRICE
                    },
                    on: {
                         'on-enter': function (event) {
                        editDetail.dataParam.CONTRACT_RENT[params.index].PRICE = event.target.value;
                        }
                    },
                })
            },           
        },

        {
            title: "月租金", key: 'RENTS', width: 120,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.RENTS
                    },
                    on: {
                        'on-enter': function (event) {
                            editDetail.dataParam.CONTRACT_RENT[params.index].RENTS = event.target.value;
                        }
                    },
                })
            },           
        },
        {
            title: "总租金", key: 'SUMRENTS', width: 200,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.SUMRENTS
                    },
                    on: {
                        'on-enter': function (event) {
                            editDetail.dataParam.CONTRACT_RENT[params.index].SUMRENTS = event.target.value;
                        }
                    },
                })
            },           
        },
    ];
    editDetail.screenParam.colDefRENTITEM = [
        { title: '时间段', key: 'INX', width: 100 },
        { title: '开始日期', key: 'STARTDATE',width: 170},
        { title: '结束日期', key: 'ENDDATE', width: 170},
        { title: '年月', key: 'YEARMONTH', width: 150},
        { title: '租金', key: 'RENTS', width: 200},
        { title: '生成日期', key: 'CREATEDATE',width: 170},
        {  title: '清算标记', key: 'QSBJ',width: 150,
           render: function(h, params){
            return h('Select',{
                props:{
                    value:params.row.QSBJ
                },
                on:{
                    'on-change':function(event){
                        Vue.set(editDetail.dataParam.CONTRACT_RENTITEM[params.index], 'QSBJ', event);
                    }
                }},
                [ h('Option', {props: {value: '1'} }, '√'),
                  h('Option', {props: {value: '2'} }, '')
                ],
            )}
        },
    ];



    if (!editDetail.dataParam.CONTRACT_BRAND) {
        editDetail.dataParam.CONTRACT_BRAND = [{
            BRANDID: ""
        }]
    };

    if (!editDetail.dataParam.CONTRACT_SHOP) {
        editDetail.dataParam.CONTRACT_SHOP = [{
            CODE: ""
        }]
    };

    if (!editDetail.dataParam.CONTRACT_RENT) {
        editDetail.dataParam.CONTRACT_RENT = [{
            PRICE: "0"
        }]
    };

    if (!editDetail.dataParam.CONTRACT_RENTITEM) {
        editDetail.dataParam.CONTRACT_RENTITEM = [{
            RENTS: "0"
        }]
    };

    
    editDetail.screenParam.addColPP = function () {
        var temp = editDetail.dataParam.CONTRACT_BRAND || [];
        temp.push({});
        editDetail.dataParam.CONTRACT_BRAND = temp;
    };
    editDetail.screenParam.addColSHOP = function () {
        var temp = editDetail.dataParam.CONTRACT_SHOP || [];
        temp.push({});
        editDetail.dataParam.CONTRACT_SHOP = temp;
    };
}

editDetail.showOne = function (data, callback) {
}

editDetail.clearKey = function () {

}

editDetail.IsValidSave = function () {
    var d = new Date(editDetail.dataParam.CONT_START);
    editDetail.dataParam.CONT_START =formatDate(editDetail.dataParam.CONT_START);

    var d = new Date(editDetail.dataParam.CONT_END);
    editDetail.dataParam.CONT_END = formatDate(editDetail.dataParam.CONT_END);

    return true;
}


function formatDate( date, isfull ) {
    if ( !date )
        return '';
    var d = new Date(date);
    if (!isfull){
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
}


editDetail.showOne = function (data, callback) {
    _.Ajax('SearchContract', {
        Data: { CONTRACTID: data }
    }, function (data) {
        $.extend(editDetail.dataParam, data.contract);
        editDetail.dataParam.BILLID = data.contract.CONTRACTID;
        callback && callback(data);
    });
}
