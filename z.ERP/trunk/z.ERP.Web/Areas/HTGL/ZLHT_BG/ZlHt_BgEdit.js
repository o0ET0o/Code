﻿editDetail.beforeVue = function () {
    editDetail.branchid = true;
    editDetail.service = "HtglService";
    editDetail.method = "GetContract";
    editDetail.dataParam.STATUS = 1;
    editDetail.dataParam.STYLE = 1;
    editDetail.dataParam.JXSL = 0;
    editDetail.dataParam.XXSL = 0;
    editDetail.dataParam.STANDARD = 1;


    editDetail.screenParam.TQFKR = [];



    //初始化返款日信息
    //转换为string 是为了保持从后台返回后一致，来显示
    var tempList = [];
    for (var i = 1; i <= 31; i++) {
        tempList.push({
            value: i.toString(),
            label: i.toString(),
        });
    };
    editDetail.screenParam.fkrList = tempList;

    //初始化弹窗所要传递参数

    editDetail.screenParam.ParentMerchant = {};
    editDetail.screenParam.ParentBrand = {};
    editDetail.screenParam.ParentShop = {};
    editDetail.screenParam.ParentFeeSubject = {};
    editDetail.screenParam.ParentPay = {};
    editDetail.screenParam.FEERULE = [];

    //品牌表格
    editDetail.screenParam.colDefPP = [
    { type: 'selection', width: 60, align: 'center' },
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
                            if (data.dt) {
                                Vue.set(editDetail.dataParam.CONTRACT_BRAND[params.index], 'NAME', data.dt.NAME);
                            } else {
                                iview.Message.info('当前品牌不存在!');
                                Vue.set(editDetail.dataParam.CONTRACT_BRAND[params.index], 'BRANDID', "");
                            }
                        });


                    }
                },
            })
        },
    },
    { title: '品牌名称', key: 'NAME', width: 200 },
    ];

    //商铺表格
    editDetail.screenParam.colDefSHOP = [
    { type: 'selection', width: 60, align: 'center' },
    {
        title: "商铺代码", key: 'CODE', width: 100,
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
                            Data: { CODE: event.target.value, BRANCHID: editDetail.dataParam.BRANCHID }
                        }, function (data) {
                            if (data.dt) {
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'SHOPID', data.dt.SHOPID);
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYID', data.dt.CATEGORYID);
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYCODE', data.dt.CATEGORYCODE);
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CATEGORYNAME', data.dt.CATEGORYNAME);
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'AREA', data.dt.AREA_BUILD);
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'AREA_RENTABLE', data.dt.AREA_RENTABLE);
                                calculateArea();
                            }
                            else {
                                iview.Message.info('当前单元代码不存在或者不属于当前分店卖场!');
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'CODE', "");
                                Vue.set(editDetail.dataParam.CONTRACT_SHOP[params.index], 'SHOPID', "");
                            }
                        });
                    }
                },
            })
        },
    },
    { title: '业态代码', key: 'CATEGORYCODE', width: 100 },
    { title: '业态名称', key: 'CATEGORYNAME', width: 100 },
    { title: '建筑面积', key: 'AREA', width: 100 },
    { title: '租用面积', key: 'AREA_RENTABLE', width: 100 }
    ];

    //扣率组
    editDetail.screenParam.colGroup = [
        { type: 'selection', width: 60, align: 'center', },
        { title: '扣点序号', key: 'GROUPNO', width: 100 },
        {
            title: "基础扣点", key: 'JSKL', width: 120,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.JSKL
                    },
                    on: {
                        'on-blur': function (event) {
                            editDetail.dataParam.CONTRACT_GROUP[params.index].JSKL = event.target.value;
                        }
                    },
                })
            },
        },

        {
            title: "描述", key: 'DESCRIPTION', width: 120,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.DESCRIPTION
                    },
                    on: {
                        'on-blur': function (event) {
                            editDetail.dataParam.CONTRACT_GROUP[params.index].DESCRIPTION = event.target.value;
                        }
                    },
                })
            },
        },
    ]

    //扣率信息
    editDetail.screenParam.colDefJskl = [
          {
              title: '时间段', key: 'INX', width: 100, sortable: true,
              render: function (h, params) {
                  return h('Input', {
                      props: {
                          value: params.row.INX
                      },
                      on: {
                          'on-blur': function (event) {
                              for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                                  if (event.target.value == editDetail.dataParam.CONTRACT_RENT[i].INX) {
                                      editDetail.dataParam.CONTJSKL[params.index].INX = event.target.value;
                                      Vue.set(editDetail.dataParam.CONTJSKL[params.index], 'STARTDATE', editDetail.dataParam.CONTRACT_RENT[i].STARTDATE);
                                      Vue.set(editDetail.dataParam.CONTJSKL[params.index], 'ENDDATE', editDetail.dataParam.CONTRACT_RENT[i].ENDDATE);
                                      break;
                                  }
                                  else {
                                      editDetail.dataParam.CONTJSKL[params.index].INX = null;
                                  }
                              };
                          }
                      },
                  })
              },
          },
          {
              title: '扣点序号', key: 'GROUPNO', width: 120, sortable: true,
              render: function (h, params) {
                  return h('Input', {
                      props: {
                          value: params.row.GROUPNO
                      },
                      on: {
                          'on-blur': function (event) {
                              editDetail.dataParam.CONTJSKL[params.index].GROUPNO = event.target.value;
                          }
                      },
                  })
              },
          },
          {
              title: '开始日期', key: 'STARTDATE', width: 140, sortable: true,
              render: function (h, params) {
                  if (this.row.STARTDATE) {
                      return h('div', new Date(this.row.STARTDATE).Format('yyyy-MM-dd'));
                  }
              }
          },
          {
              title: '结束日期', key: 'ENDDATE', width: 140,
              render: function (h, params) {
                  if (this.row.ENDDATE) {
                      return h('div', new Date(this.row.ENDDATE).Format('yyyy-MM-dd'));
                  }
              }
          },
          {
              title: "起始金额", key: 'SALES_START', width: 120,
              render: function (h, params) {
                  return h('Input', {
                      props: {
                          value: params.row.SALES_START
                      },
                      on: {
                          'on-blur': function (event) {
                              editDetail.dataParam.CONTJSKL[params.index].SALES_START = event.target.value;
                          }
                      },
                  })
              },
          },

          {
              title: "结束金额(包含)", key: 'SALES_END', width: 120,
              render: function (h, params) {
                  return h('Input', {
                      props: {
                          value: params.row.SALES_END
                      },
                      on: {
                          'on-blur': function (event) {
                              editDetail.dataParam.CONTJSKL[params.index].SALES_END = event.target.value;
                          }
                      },
                  })
              },
          },
          {
              title: "扣点", key: 'JSKL', width: 100,
              render: function (h, params) {
                  return h('Input', {
                      props: {
                          value: params.row.JSKL
                      },
                      on: {
                          'on-blur': function (event) {
                              editDetail.dataParam.CONTJSKL[params.index].JSKL = event.target.value;
                          }
                      },
                  })
              },
          },
    ]

    //租金表格
    editDetail.screenParam.colDefRENT = [
       { type: 'selection', width: 60, align: 'center', },
       { title: '时间段', key: 'INX', width: 80 },
        {
            title: '开始日期',
            key: 'STARTDATE',
            width: 150,
            render: function (h, params) {
                return h('div',
                  new Date(this.row.STARTDATE).Format('yyyy-MM-dd'));
            }

        },
        {
            title: '结束日期',
            key: 'ENDDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.ENDDATE,
                        transfer: true
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
            title: '金额类型', key: 'DJLX', width: 150,
            render: function (h, params) {
                return h('Select', {
                    props: {
                        value: params.row.DJLX,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'DJLX', event);
                        }
                    }
                },
                [h('Option', { props: { value: '1' } }, '日金额'),
                  h('Option', { props: { value: '2' } }, '月金额')
                ])
            }
        },
        {
            title: "单价", key: 'PRICE', width: 150,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.PRICE
                    },
                    on: {
                        'on-enter': function (event) {
                            editDetail.dataParam.CONTRACT_RENT[params.index].PRICE = event.target.value;
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'RENTS', (event.target.value * editDetail.dataParam.AREAR).toFixed(2));
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'CONTRACT_RENTITEM', []);
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'SUMRENTS', 0);

                        }
                    },
                })
            },
        },
        {
            title: "租金", key: 'RENTS', width: 150,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.RENTS
                    },
                    on: {
                        'on-enter': function (event) {
                            editDetail.dataParam.CONTRACT_RENT[params.index].RENTS = event.target.value;
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'PRICE', (event.target.value / editDetail.dataParam.AREAR).toFixed(2));
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'CONTRACT_RENTITEM', []);
                            Vue.set(editDetail.dataParam.CONTRACT_RENT[params.index], 'SUMRENTS', 0);
                        }
                    },
                })
            },
        },
        { title: "总租金", key: 'SUMRENTS', width: 150 },
    ];

    //月度分解表格
    editDetail.screenParam.colDefRENTITEM = [
        { title: '时间段', key: 'INX', width: 80 },
        {
            title: '开始日期', key: 'STARTDATE', width: 150,
            render: function (h, params) {
                return h('div',
                  new Date(this.row.STARTDATE).Format('yyyy-MM-dd'));
            }
        },
        {
            title: '结束日期', key: 'ENDDATE', width: 150,
            render: function (h, params) {
                return h('div',
                  new Date(this.row.ENDDATE).Format('yyyy-MM-dd'));
            }
        },
        { title: '年月', key: 'YEARMONTH', width: 100 },
        { title: '租金', key: 'RENTS', width: 200 },
        {
            title: '减免金额', key: 'JMJE', width: 100,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.JMJE
                    },
                    on: {
                        'on-blur': function (event) {
                            var len = 0;
                            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                                var lenold = len;
                                len += editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length;
                                var colIndex = params.index + 1;

                                if ((colIndex > lenold) && (colIndex <= len)) {
                                    editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[params.index - lenold].JMJE = event.target.value;;
                                    break;
                                }
                            };
                        }
                    },
                })
            },
        },
        {
            //title: '生成日期', key: 'CREATEDATE', width: 170,
            //render: function (h, params) {
            //    return h('div',
            //      new Date(this.row.CREATEDATE).Format('yyyy-MM-dd'));
            //}
            title: '生成日期',
            key: 'CREATEDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.CREATEDATE,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            var len = 0;
                            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                                var lenold = len;
                                len += editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length;
                                var colIndex = params.index + 1;

                                if ((colIndex > lenold) && (colIndex <= len)) {
                                    editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[params.index - lenold].CREATEDATE = event;
                                    break;
                                }
                            };
                        }
                    },
                })
            },
        },
        {
            title: '月清算标记', key: 'QSBJ', width: 150,
            render: function (h, params) {
                return h('Select', {
                    props: {
                        value: params.row.QSBJ,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            var len = 0;
                            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                                var lenold = len;
                                len += editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length;
                                var colIndex = params.index + 1;

                                if ((colIndex > lenold) && (colIndex <= len)) {
                                    editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[params.index - lenold].QSBJ = event;
                                    break;
                                }
                            };
                        }
                    }
                },
                [
                    h('Option', { props: { value: "1" } }, '是'),
                    h('Option', { props: { value: "2" } }, '否')
                ])
            }
        },

        {
            title: '区间清算标记', key: 'QJQSBJ', width: 150,
            render: function (h, params) {
                return h('Select', {
                    props: {
                        value: params.row.QJQSBJ,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            var len = 0;
                            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                                var lenold = len;
                                len += editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length;
                                var colIndex = params.index + 1;

                                if ((colIndex > lenold) && (colIndex <= len)) {
                                    editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[params.index - lenold].QJQSBJ = event;
                                    break;
                                }
                            };
                        }
                    }
                },
                [
                    h('Option', { props: { value: "1" } }, '是'),
                    h('Option', { props: { value: "2" } }, '否')
                ])
            }
        },
    ];

    //收费项目
    editDetail.screenParam.colDefCOST = [
        { type: 'selection', width: 60, align: 'center', },
        { title: '序号', key: 'INX', width: 70 },
        {
            title: "费用项目", key: 'TERMID', width: 100,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.TERMID
                    },
                    on: {
                        'on-enter': function (event) {
                            _self = this;
                            editDetail.dataParam.CONTRACT_COST[params.index].TERMID = event.target.value;

                            _.Ajax('GetFeeSubject', {
                                Data: { TRIMID: event.target.value }
                            }, function (data) {
                                if (data.dt) {
                                    Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'NAME', data.dt.NAME);
                                } else {
                                    iview.Message.info('当前费用项目不存在!');
                                }
                            });
                        }
                    },
                })
            },
        },
        { title: "费用项目名称", key: 'NAME', width: 120 },
        {
            title: '开始日期',
            key: 'STARTDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.STARTDATE,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'STARTDATE', event);
                        }
                    },
                })
            },
        },
        {
            title: '结束日期',
            key: 'ENDDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.ENDDATE,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'ENDDATE', event);
                        }
                    },
                })
            },
        },
        {
            title: '收费方式', key: 'SFFS', width: 150,
            render: function (h, params) {
                return h('Select',
                    {
                        props: {
                            value: params.row.SFFS,
                            transfer: true
                        },
                        on: {
                            'on-change': function (event) {
                                Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'SFFS', event);
                            }
                        }
                    },
                [
                    h('Option', { props: { value: 1 } }, '按日计算固定金额'),
                    h('Option', { props: { value: 2 } }, '按日计算月固定金额'),
                    h('Option', { props: { value: 3 } }, '按销售金额比例'),
                    h('Option', { props: { value: 4 } }, '月固定金额'),
                ])
            }
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
                            editDetail.dataParam.CONTRACT_COST[params.index].PRICE = event.target.value;
                            Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'COST', (event.target.value * editDetail.dataParam.AREAR).toFixed(2));
                        }
                    },
                })
            },
        },
        {
            title: "金额", key: 'COST', width: 150,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.COST
                    },
                    on: {
                        'on-enter': function (event) {
                            editDetail.dataParam.CONTRACT_COST[params.index].COST = event.target.value;
                            Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'PRICE', (event.target.value / editDetail.dataParam.AREAR).toFixed(2));
                        }
                    },
                })
            },
        },
        {
            title: "比例", key: 'KL', width: 100,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.KL
                    },
                    on: {
                        'on-blur': function (event) {
                            editDetail.dataParam.CONTRACT_COST[params.index].KL = event.target.value;
                        }
                    },
                })
            },
        },
        {
            title: '收费规则', key: 'FEERULEID', width: 150,
            render: function (h, params) {
                var allFEERULE = [];
                if (editDetail.screenParam.FEERULE.length > 0) {
                    for (var i = 0; i < editDetail.screenParam.FEERULE.length; i++) {
                        allFEERULE.push(h('Option',
                                {
                                    props:
                                      { value: editDetail.screenParam.FEERULE[i].ID }
                                }, editDetail.screenParam.FEERULE[i].NAME));
                    };
                };
                return h('Select',
                    {
                        props: {
                            value: params.row.FEERULEID,
                            transfer: true
                        },
                        on: {
                            'on-change': function (event) {
                                Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'FEERULEID', event);
                            }
                        }
                    },
                    allFEERULE
                )
            }
        },

        {
            title: '生成日期是否和租金保持一致', key: 'IF_RENT_FEERULE', width: 150,
            render: function (h, params) {
                return h('Select',
                    {
                        props: {
                            value: params.row.IF_RENT_FEERULE,
                            transfer: true
                        },
                        on: {
                            'on-change': function (event) {
                                Vue.set(editDetail.dataParam.CONTRACT_COST[params.index], 'IF_RENT_FEERULE', event);
                            }
                        }
                    },
                [
                    h('Option', { props: { value: 1 } }, '是'),
                    h('Option', { props: { value: 2 } }, '否')
                ]
                )
            }
        }
    ]

    //收款方式手续费
    editDetail.screenParam.colDefPAY = [
        { type: 'selection', width: 60, align: 'center', },
        { title: "收款方式", key: 'PAYID', width: 120 },
        { title: "收款方式名称", key: 'NAME', width: 120 },
        {
            title: "费用项目", key: 'TERMID', width: 120,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.TERMID
                    },
                    on: {
                        'on-enter': function (event) {
                            _self = this;
                            editDetail.dataParam.CONTRACT_PAY[params.index].TERMID = event.target.value;

                            _.Ajax('GetFeeSubject', {
                                Data: { TRIMID: event.target.value }
                            }, function (data) {
                                if (data.dt) {
                                    Vue.set(editDetail.dataParam.CONTRACT_PAY[params.index], 'TERMNAME', data.dt.NAME);
                                } else {
                                    iview.Message.info('当前费用项目不存在!');
                                }
                            });
                        }
                    },
                })
            },
        },
        { title: "费用项目名称", key: 'TERMNAME', width: 120 },

        {
            title: '开始日期',
            key: 'STARTDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.STARTDATE,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_PAY[params.index], 'STARTDATE', event);
                        }
                    },
                })
            },
        },
        {
            title: '结束日期',
            key: 'ENDDATE',
            width: 150,
            render: function (h, params) {
                return h('DatePicker', {
                    props: {
                        value: params.row.ENDDATE,
                        transfer: true
                    },
                    on: {
                        'on-change': function (event) {
                            Vue.set(editDetail.dataParam.CONTRACT_PAY[params.index], 'ENDDATE', event);
                        }
                    },
                })
            },
        },
        {
            title: "比例", key: 'KL', width: 120,
            render: function (h, params) {
                return h('Input', {
                    props: {
                        value: params.row.KL
                    },
                    on: {
                        'on-blur': function (event) {
                            editDetail.dataParam.CONTRACT_PAY[params.index].KL = event.target.value;
                        }
                    },
                })
            },
        },
    ]


    //表格数据初始化
    editDetail.dataParam.CONTRACT_BRAND = editDetail.dataParam.CONTRACT_BRAND || [];
    editDetail.dataParam.CONTRACT_SHOP = editDetail.dataParam.CONTRACT_SHOP || [];
    editDetail.dataParam.CONTRACT_RENT = editDetail.dataParam.CONTRACT_RENT || [];
    editDetail.dataParam.CONTRACT_RENT.CONTRACT_RENTITEM = editDetail.dataParam.CONTRACT_RENT.CONTRACT_RENTITEM || [];
    editDetail.dataParam.CONTRACT_GROUP = editDetail.dataParam.CONTRACT_GROUP || [];
    editDetail.dataParam.CONTJSKL = editDetail.dataParam.CONTJSKL || [];
    editDetail.dataParam.CONTRACT_COST = editDetail.dataParam.CONTRACT_COST || [];
    editDetail.dataParam.CONTRACT_PAY = editDetail.dataParam.CONTRACT_PAY || [];

    calculateArea = function () {
        editDetail.dataParam.AREA_BUILD = 0;
        editDetail.dataParam.AREAR = 0;
        for (var i = 0; i < editDetail.dataParam.CONTRACT_SHOP.length; i++) {
            if (editDetail.dataParam.CONTRACT_SHOP[i].SHOPID) {
                editDetail.dataParam.AREA_BUILD += editDetail.dataParam.CONTRACT_SHOP[i].AREA;
                editDetail.dataParam.AREAR += editDetail.dataParam.CONTRACT_SHOP[i].AREA_RENTABLE;
            }
        }
    }
}

editDetail.otherMethods = {
    //点击商户弹窗
    Merchant: function () {
        Vue.set(editDetail.screenParam, "PopMerchant", true);
    },
    //商户弹窗返回
    MerchantBack: function (val) {
        Vue.set(editDetail.screenParam, "PopMerchant", false);
        editDetail.dataParam.MERCHANTID = val.sj[0].MERCHANTID;
        editDetail.dataParam.MERNAME = val.sj[0].NAME;
    },
    //点击品牌弹窗
    srchColPP: function () {
        Vue.set(editDetail.screenParam, "PopBrand", true);
    },
    //返回品牌弹窗
    BrandBack: function (val) {
        Vue.set(editDetail.screenParam, "PopBrand", false);
        for (var i = 0; i < val.sj.length; i++) {
            editDetail.dataParam.CONTRACT_BRAND.push(val.sj[i]);
        }
    },
    //选择商铺弹窗
    srchColSHOP: function () {
        if (!editDetail.dataParam.BRANCHID) {
            iview.Message.info("请确认分店卖场!");
            return false;
        } else {
            Vue.set(editDetail.screenParam, "PopShop", true);
            editDetail.screenParam.ParentShop = { BRANCHID: editDetail.dataParam.BRANCHID };
        }
    },
    //商铺返回弹窗
    ShopBack: function (val) {
        Vue.set(editDetail.screenParam, "PopShop", false);
        for (var i = 0; i < val.sj.length; i++) {
            editDetail.dataParam.CONTRACT_SHOP.push(val.sj[i]);
        };
        calculateArea();
    },

    srchCost: function () {
        Vue.set(editDetail.screenParam, "PopFeeSubject", true);
    },

    FeeSubjectBack: function (val) {
        Vue.set(editDetail.screenParam, "PopFeeSubject", false);
        var maxIndex = 1;
        for (var i = 0; i < val.sj.length; i++) {
            if (editDetail.dataParam.CONTRACT_COST) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_COST.length; j++) {
                    maxIndex = editDetail.dataParam.CONTRACT_COST[0].INX;
                    if (editDetail.dataParam.CONTRACT_COST[j].INX > maxIndex) {
                        maxIndex = editDetail.dataParam.CONTRACT_COST[j].INX
                    };
                    maxIndex++;
                };
            };
            editDetail.dataParam.CONTRACT_COST.push({
                INX: maxIndex,
                TERMID: val.sj[i].TERMID,
                NAME: val.sj[i].NAME
            });
        };
    },



    srchPay: function () {
        Vue.set(editDetail.screenParam, "PopPay", true);
    },
    PayBack: function (val) {
        Vue.set(editDetail.screenParam, "PopPay", false);
        for (var i = 0; i < val.sj.length; i++) {
            editDetail.dataParam.CONTRACT_PAY.push(val.sj[i]);
        }
    },

    srchPayCost: function () {
        var selectton = this.$refs.selectPay.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请先添加收款方式并且选中收款方式!");
            return;
        };
        Vue.set(editDetail.screenParam, "PopPayFeeSubject", true);
    },

    PayFeeSubjectBack: function (val) {
        Vue.set(editDetail.screenParam, "PopPayFeeSubject", false);

        var selectton = this.$refs.selectPay.getSelection().length;

        var numbers = [selectton, val.sj.length];
        var minInNumbers = Math.min.apply(Math, numbers);

        for (var i = 0; i < minInNumbers; i++) {
            Vue.set(editDetail.dataParam.CONTRACT_PAY[i], 'TERMID', val.sj[i].TRIMID);
            Vue.set(editDetail.dataParam.CONTRACT_PAY[i], 'TERMNAME', val.sj[i].NAME);
        }
    },




    //添加品牌
    addColPP: function () {
        var temp = editDetail.dataParam.CONTRACT_BRAND || [];
        temp.push({});
        editDetail.dataParam.CONTRACT_BRAND = temp;
    },
    //删除品牌
    delColPP: function () {
        var selectton = this.$refs.selectBrand.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的品牌!");
        } else {
            for (var i = 0; i < selectton.length; i++) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_BRAND.length; j++) {
                    if (editDetail.dataParam.CONTRACT_BRAND[j].BRANDID == selectton[i].BRANDID) {
                        editDetail.dataParam.CONTRACT_BRAND.splice(j, 1);
                    }
                }
            }
        }
    },
    //添加商铺
    addColSHOP: function () {
        if (!editDetail.dataParam.BRANCHID) {
            iview.Message.info('请先确认分店!');
            return;
        }
        var temp = editDetail.dataParam.CONTRACT_SHOP || [];
        temp.push({});
        editDetail.dataParam.CONTRACT_SHOP = temp;
    },
    //删除商铺
    delColSHOP: function () {
        var selectton = this.$refs.selectShop.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的商铺!");
        } else {
            for (var i = 0; i < selectton.length; i++) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_SHOP.length; j++) {
                    if (editDetail.dataParam.CONTRACT_SHOP[j].SHOPID == selectton[i].SHOPID) {
                        editDetail.dataParam.CONTRACT_SHOP.splice(j, 1);
                        calculateArea();
                    }
                }
            }
        }
    },
    //添加一行保底信息
    addColDefRENT: function () {

        if (editDetail.dataParam.CONTRACT_SHOP.length == 0) {
            iview.Message.info("请确定商铺!");
            return false;
        };
        if (editDetail.dataParam.CONTRACT_RENT) {
            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                if (!editDetail.dataParam.CONTRACT_RENT[i].ENDDATE) {
                    iview.Message.info("请先维护结束日期!");
                    return;
                }
            }
        }
        var temp = editDetail.dataParam.CONTRACT_RENT || [];
        var maxINX = 1;
        var maxSTARTDATE = null;
        if (editDetail.dataParam.CONTRACT_RENT) {
            for (var j = 0; j < editDetail.dataParam.CONTRACT_RENT.length; j++) {
                maxINX = editDetail.dataParam.CONTRACT_RENT[0].INX;
                maxSTARTDATE = editDetail.dataParam.CONTRACT_RENT[0].ENDDATE;
                if (editDetail.dataParam.CONTRACT_RENT[j].INX > maxINX) {
                    maxINX = editDetail.dataParam.CONTRACT_RENT[j].INX
                }
                if (editDetail.dataParam.CONTRACT_RENT[j].ENDDATE > maxSTARTDATE) {
                    maxSTARTDATE = editDetail.dataParam.CONTRACT_RENT[j].ENDDATE
                }
                maxINX++;
            }
        };
        if (editDetail.dataParam.CONTRACT_RENT.length == 0) {
            temp.push({ INX: maxINX, STARTDATE: new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd'), RENTS: 0 });
        }
        else {
            temp.push({ INX: maxINX, STARTDATE: new Date((addDate(maxSTARTDATE))).Format('yyyy-MM-dd'), RENTS: 0 });
        };

        editDetail.dataParam.CONTRACT_RENT = temp;
    },

    //删除一行保底
    delColDefRENT: function () {
        var selectton = this.$refs.selectRent.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的数据!");
        } else {
            var maxRentInx = 1;
            for (var j = 0; j < editDetail.dataParam.CONTRACT_RENT.length; j++) {
                if (editDetail.dataParam.CONTRACT_RENT[j].INX > maxRentInx) {
                    maxRentInx = editDetail.dataParam.CONTRACT_RENT[j].INX;
                }
            }

            for (var i = 0; i < selectton.length; i++) {
                if (selectton[i].INX < maxRentInx) {
                    iview.Message.info("只能按照时间段序号从大到小删除!");
                    return;
                }
            }

            for (var i = 0; i < selectton.length; i++) {
                if (selectton[i].STARTDATE == (editDetail.dataParam.CONT_START)) {
                    iview.Message.info("开始日期和租约开始日期相同不能删除!");
                    return;
                }
                for (var j = 0; j < editDetail.dataParam.CONTRACT_RENT.length; j++) {
                    if (editDetail.dataParam.CONTRACT_RENT[j].INX == selectton[i].INX) {
                        editDetail.dataParam.CONTRACT_RENT.splice(j, 1);
                        calculateArea();
                    }
                }
            }
        }
    },

    //按年度分解
    //按年度分解
    operPeriod: function () {
        if (editDetail.dataParam.CONTRACT_SHOP.length == 0) {
            iview.Message.info("请确定商铺!");
            return false;
        };
        if (!editDetail.dataParam.CONT_START || !editDetail.dataParam.CONT_END) {
            iview.Message.info("请先维护租约开始结束日期!");
            return;
        }
        if (editDetail.dataParam.CONT_START > editDetail.dataParam.CONT_END) {
            iview.Message.info("租约结束日期不能小于开始日期！");
            return;
        }
        editDetail.dataParam.CONTRACT_RENT = [];


        var yearsValue = getYears(new Date(editDetail.dataParam.CONT_START),
            new Date(editDetail.dataParam.CONT_END));
        var nestYear = null;
        var rentData = null;
        var beginHtq = editDetail.dataParam.CONT_START;
        var beginMzqHtq = editDetail.dataParam.CONT_START;

        var inx = 0;
        if (editDetail.dataParam.FREE_END) {
            rentData = {
                INX: inx + 1,
                STARTDATE: beginHtq,
                ENDDATE: editDetail.dataParam.FREE_END,
                DJLX: '2',  //默认月金额
                PRICE: 0,
                RENTS: 0,
                RENTS_JSKL: 0,
                SUMRENTS: 0
            }
            editDetail.dataParam.CONTRACT_RENT.push(rentData);
            inx = 1;

            beginMzqHtq = addDate(editDetail.dataParam.FREE_END, 1);

            var yearMzq = getNextYears(editDetail.dataParam.FREE_BEGIN);

            if (yearMzq <= (new Date(editDetail.dataParam.FREE_END).Format('yyyy-MM-dd'))) {
                beginHtq = beginMzqHtq;
            }
        };

        var copyHtQsr = (beginMzqHtq);


        //循环年数
        for (var i = 0; i <= yearsValue; i++) {
            if (i != 0) {
                beginHtq = copyHtQsr;
            }
            nestYear = getNextYears(beginHtq);
            if (nestYear < (new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd'))) {
                rentData = {
                    INX: i + 1 + inx,
                    STARTDATE: copyHtQsr,
                    ENDDATE: nestYear,
                    DJLX: '2',  //默认月金额
                    PRICE: 0,
                    RENTS: 0,
                    RENTS_JSKL: 0,
                    SUMRENTS: 0
                }
                editDetail.dataParam.CONTRACT_RENT.push(rentData);
                copyHtQsr = addDate(nestYear);
            } else {
                rentData = {
                    INX: i + 1 + inx,
                    STARTDATE: copyHtQsr,
                    ENDDATE: (new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')),
                    DJLX: '2',  //默认月金额
                    PRICE: 0,
                    RENTS: 0,
                    RENTS_JSKL: 0,
                    SUMRENTS: 0
                }
                editDetail.dataParam.CONTRACT_RENT.push(rentData);
                break;
            }
        }
    },

    //分解月度数据
    decompose: function () {
        if (editDetail.dataParam.CONTRACT_RENT.length == 0) {
            iview.Message.info("请先维护时间段信息!");
            return;
        };
        for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
            if (editDetail.dataParam.CONTRACT_RENT[i].ENDDATE == undefined) {
                iview.Message.info("日期段的结束日期不能为空");
                return;
            } else if (new Date(editDetail.dataParam.CONTRACT_RENT[i].ENDDATE) > new Date(editDetail.dataParam.CONT_END)) {
                iview.Message.info("日期段中的结束日期不能大于租约结束日期");
                return;
            } else if (new Date(editDetail.dataParam.CONTRACT_RENT[i].STARTDATE) > new Date(editDetail.dataParam.CONTRACT_RENT[i].ENDDATE)) {
                iview.Message.info("日期段中结束日期不能小于开始日期");
                return;
            }
        };
        if (!editDetail.dataParam.FEERULE_RENT) {
            iview.Message.info("请先维护租金收费规则!");
            return;
        };
        if (!editDetail.dataParam.STANDARD) {
            iview.Message.info("请先维护周期方式!");
            return;
        };

        _.Ajax('zlYdFj', {
            Data: editDetail.dataParam.CONTRACT_RENT,
            ContractData: {
                CONT_START: (editDetail.dataParam.CONT_START),
                CONT_END: (editDetail.dataParam.CONT_END),
                FEERULE_RENT: editDetail.dataParam.FEERULE_RENT,
                STANDARD: editDetail.dataParam.STANDARD
            }
        }, function (data) {

            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                var localItem = [];
                for (var j = 0; j < data.length; j++) {
                    if (data[j].INX == editDetail.dataParam.CONTRACT_RENT[i].INX) {
                        data[j].QSBJ = "1";      //增加默认值
                        data[j].QJQSBJ = "2";
                        localItem.push(data[j]);
                    };
                };
                editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM = localItem;

            };

            Vue.set(editDetail.dataParam.CONTRACT_RENT, "CONTRACT_RENTITEM", data);

            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                var sumRents = 0;
                for (var j = 0; j < editDetail.dataParam.CONTRACT_RENT.CONTRACT_RENTITEM.length; j++) {
                    if (editDetail.dataParam.CONTRACT_RENT.CONTRACT_RENTITEM[j].INX == editDetail.dataParam.CONTRACT_RENT[i].INX) {
                        sumRents += parseFloat(editDetail.dataParam.CONTRACT_RENT.CONTRACT_RENTITEM[j].RENTS);
                    };
                };
                Vue.set(editDetail.dataParam.CONTRACT_RENT[i], 'SUMRENTS', sumRents);
            };
        });
    },

    //添加扣率组
    addColGroup: function () {
        var temp = editDetail.dataParam.CONTRACT_GROUP || [];
        var maxGROUPNO = 1;
        if (editDetail.dataParam.CONTRACT_GROUP) {
            for (var j = 0; j < editDetail.dataParam.CONTRACT_GROUP.length; j++) {
                maxGROUPNO = editDetail.dataParam.CONTRACT_GROUP[0].GROUPNO;
                if (editDetail.dataParam.CONTRACT_GROUP[j].GROUPNO > maxGROUPNO) {
                    maxGROUPNO = editDetail.dataParam.CONTRACT_GROUP[j].GROUPNO
                }
                maxGROUPNO++;
            }
        }
        temp.push({ GROUPNO: maxGROUPNO });
        editDetail.dataParam.CONTRACT_GROUP = temp;

    },
    //删除扣率组
    delColGroup: function () {
        var selectton = this.$refs.selectGroup.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的扣点组!");
        } else {
            for (var i = 0; i < selectton.length; i++) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_GROUP.length; j++) {
                    if (editDetail.dataParam.CONTRACT_GROUP[j].GROUPNO == selectton[i].GROUPNO) {
                        editDetail.dataParam.CONTRACT_GROUP.splice(j, 1);
                    }
                }
            }
        }
    },
    //自动生成扣率信息
    autoMakeGroup: function () {
        editDetail.dataParam.CONTJSKL = [];
        if (editDetail.dataParam.CONTRACT_RENT.length == 0) {
            iview.Message.info("请先维护时间段信息!");
            return;
        }
        if (editDetail.dataParam.CONTRACT_GROUP.length == 0) {
            iview.Message.info("请先维护扣点组信息!");
            return;
        }

        if (editDetail.dataParam.CONTRACT_RENT) {
            for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
                if (!editDetail.dataParam.CONTRACT_RENT[i].ENDDATE) {
                    iview.Message.info("请先维护时间段完整结束日期!");
                    return;
                }
                if (!editDetail.dataParam.CONTRACT_RENT[i].STARTDATE) {
                    iview.Message.info("请先维护时间段完整开始日期!");
                    return;
                }
            }
        }
        //先循环时间段信息,再循环扣点组信息
        var localData = [];
        for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length; i++) {
            for (j = 0; j < editDetail.dataParam.CONTRACT_GROUP.length; j++) {


                localData.push({
                    GROUPNO: editDetail.dataParam.CONTRACT_GROUP[j].GROUPNO,
                    INX: editDetail.dataParam.CONTRACT_RENT[i].INX,
                    STARTDATE: (editDetail.dataParam.CONTRACT_RENT[i].STARTDATE),
                    ENDDATE: (editDetail.dataParam.CONTRACT_RENT[i].ENDDATE),
                    JSKL: editDetail.dataParam.CONTRACT_GROUP[j].JSKL,
                    SALES_START: 0,
                    SALES_END: 999999999
                });
            }
        }
        editDetail.dataParam.CONTJSKL = localData;
    },

    //添加一行扣率信息
    addCONTJSKL: function () {
        var temp = editDetail.dataParam.CONTJSKL || [];
        temp.push({});
        editDetail.dataParam.CONTJSKL = temp;

    },
    //添加租约收费项目信息
    addColCost: function () {

        var temp = editDetail.dataParam.CONTRACT_COST || [];
        var maxIndex = 1;
        if (editDetail.dataParam.CONTRACT_COST) {
            for (var j = 0; j < editDetail.dataParam.CONTRACT_COST.length; j++) {
                maxIndex = editDetail.dataParam.CONTRACT_COST[0].INX;
                if (editDetail.dataParam.CONTRACT_COST[j].INX > maxIndex) {
                    maxIndex = editDetail.dataParam.CONTRACT_COST[j].INX
                }
                maxIndex++;
            }
        }
        temp.push({ INX: maxIndex });
        editDetail.dataParam.CONTRACT_COST = temp;
    },
    //删除租约收费项目信息
    delColCost: function () {
        var selectton = this.$refs.selectCost.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的数据!");
        } else {
            for (var i = 0; i < selectton.length; i++) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_COST.length; j++) {
                    if (editDetail.dataParam.CONTRACT_COST[j].INX == selectton[i].INX) {
                        editDetail.dataParam.CONTRACT_COST.splice(j, 1);
                    }
                }
            }
        }
    },

    //添加收款方式手续费
    addColPay: function () {
        var temp = editDetail.dataParam.CONTRACT_PAY || [];
        temp.push({});
        editDetail.dataParam.CONTRACT_PAY = temp;
    },
    //删除收款方式手续费
    delColPay: function () {
        var selectton = this.$refs.selectPay.getSelection();
        if (selectton.length == 0) {
            iview.Message.info("请选中要删除的数据!");
        } else {
            for (var i = 0; i < selectton.length; i++) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_PAY.length; j++) {
                    if (editDetail.dataParam.CONTRACT_PAY[j].PAYID == selectton[i].PAYID) {
                        editDetail.dataParam.CONTRACT_PAY.splice(j, 1);
                    }
                }
            }
        }
    },
}


editDetail.clearKey = function () {
    editDetail.dataParam.BILLID = null;
    editDetail.dataParam.CONTRACTID = null;
    editDetail.dataParam.CONTRACT_BRAND = [];
    editDetail.dataParam.CONTRACT_SHOP = [];
    editDetail.dataParam.CONTRACT_RENT = [];
    editDetail.dataParam.CONTRACT_GROUP = [];
    editDetail.dataParam.CONTJSKL = [];
    Vue.set(editDetail.dataParam.CONTRACT_RENT, "CONTRACT_RENTITEM", []);
    editDetail.dataParam.CONTRACT_COST = [];
    editDetail.dataParam.CONTRACT_PAY = [];

}

editDetail.IsValidSave = function () {


    if (!editDetail.dataParam.BRANCHID) {
        iview.Message.info("请确认分店卖场!");
        return false;
    };
    if (!editDetail.dataParam.MERCHANTID) {
        iview.Message.info("请选择商户!");
        return false;
    };

    if (!editDetail.dataParam.JHRQ) {
        iview.Message.info("请维护变更日期!");
        return false;
    };

    if (new Date(editDetail.dataParam.JHRQ).Format('yyyy-MM-dd') < new Date().Format('yyyy-MM-dd')) {
        iview.Message.info("变更日期不能小于当前日期!");
        return false;
    };


    if ((editDetail.dataParam.FIT_BEGIN != null) && (editDetail.dataParam.FIT_BEGIN.length > 0)) {
        if (editDetail.dataParam.FIT_END == null) {
            iview.Message.info("请维护装修结束日期!");
            return false;
        }
        else if (editDetail.dataParam.FIT_END.length == 0) {
            iview.Message.info("请维护装修结束日期!");
            return false;
        };
    };

    if ((editDetail.dataParam.FIT_END != null) && (editDetail.dataParam.FIT_END.length > 0)) {
        if (editDetail.dataParam.FIT_BEGIN == null) {
            iview.Message.info("请维护装修开始日期!");
            return false;
        }
        else if (editDetail.dataParam.FIT_BEGIN.length == 0) {
            iview.Message.info("请维护装修开始日期!");
            return false;
        };
    };



    if ((editDetail.dataParam.FREE_BEGIN != null) && (editDetail.dataParam.FREE_BEGIN.length > 0)) {
        if (editDetail.dataParam.FREE_END == null) {
            iview.Message.info("请维护免租结束日期!");
            return false;
        }
        else if (editDetail.dataParam.FREE_END.length == 0) {
            iview.Message.info("请维护免租结束日期!");
            return false;
        };
    };

    if ((editDetail.dataParam.FREE_END != null) && (editDetail.dataParam.FREE_END.length > 0)) {
        if (editDetail.dataParam.FREE_BEGIN == null) {
            iview.Message.info("请维护免租开始日期!");
            return false;
        }
        else if (editDetail.dataParam.FREE_BEGIN.length == 0) {
            iview.Message.info("请维护免租开始日期!");
            return false;
        };
    };


    if (editDetail.dataParam.FIT_BEGIN != null) {
        if (editDetail.dataParam.FIT_BEGIN.length != 0) {
            if (((new Date(editDetail.dataParam.FIT_BEGIN).Format('yyyy-MM-dd') < new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd')))
              ||
              ((new Date(editDetail.dataParam.FIT_BEGIN).Format('yyyy-MM-dd') > new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')))) {
                iview.Message.info("装修开始日期需在租约有效期内!");
                return false;
            };
        };
    };

    if (editDetail.dataParam.FIT_END != null) {
        if (editDetail.dataParam.FIT_END.length != 0) {
            if (((new Date(editDetail.dataParam.FIT_END).Format('yyyy-MM-dd') < new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd')))
            ||
            ((new Date(editDetail.dataParam.FIT_END).Format('yyyy-MM-dd') > new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')))) {
                iview.Message.info("装修结束日期需在租约有效期内!");
                return false;
            };
        };
    };

    if (editDetail.dataParam.FREE_BEGIN != null) {
        if (editDetail.dataParam.FREE_BEGIN.length > 0) {
            if (((new Date(editDetail.dataParam.FREE_BEGIN).Format('yyyy-MM-dd') < new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd')))
            ||
            ((new Date(editDetail.dataParam.FREE_BEGIN).Format('yyyy-MM-dd') > new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')))) {
                iview.Message.info("免租开始日期需在租约有效期内!");
                return false;
            };
        };

    };

    if (editDetail.dataParam.FREE_END != null) {
        if (editDetail.dataParam.FREE_END.length != 0) {
            if (((new Date(editDetail.dataParam.FREE_END).Format('yyyy-MM-dd') < new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd')))
            ||
            ((new Date(editDetail.dataParam.FREE_END).Format('yyyy-MM-dd') > new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')))) {
                iview.Message.info("免租结束日期需在租约有效期内!");
                return false;
            };
        };
    };

    if (!editDetail.dataParam.CONT_START) {
        iview.Message.info("请维护开始日期!");
        return false;
    };

    if (!editDetail.dataParam.CONT_END) {
        iview.Message.info("请维护结束日期!");
        return false;
    };
    if (!editDetail.dataParam.ORGID) {
        iview.Message.info("请确定招商部门!");
        return false;
    };
    if (!editDetail.dataParam.OPERATERULE) {
        iview.Message.info("请确定合作方式!");
        return false;
    };

    if (editDetail.dataParam.CONTRACT_BRAND.length == 0) {
        iview.Message.info("请确定品牌!");
        return false;
    } else {
        for (var i = 0; i < editDetail.dataParam.CONTRACT_BRAND.length; i++) {
            if (!editDetail.dataParam.CONTRACT_BRAND[i].BRANDID) {
                iview.Message.info("请确定品牌!");
                return false;
            };
        };
    };
    if (editDetail.dataParam.CONTRACT_SHOP.length == 0) {
        iview.Message.info("请确定商铺!");
        return false;
    } else {
        for (var i = 0; i < editDetail.dataParam.CONTRACT_SHOP.length; i++) {
            if (!editDetail.dataParam.CONTRACT_SHOP[i].SHOPID) {
                iview.Message.info("请确定商铺!");
                return false;
            };
        };
    };
    if (editDetail.dataParam.CONTRACT_RENT.length == 0) {
        iview.Message.info("请确定时间段结算信息!");
        return false;
    } else {
        for (var i = 0; i < editDetail.dataParam.CONTRACT_RENT.length ; i++) {

            if (new Date(editDetail.dataParam.CONTRACT_RENT[i].STARTDATE).Format('yyyy-MM-dd')

                < new Date(editDetail.dataParam.CONT_START).Format('yyyy-MM-dd')) {
                iview.Message.info("时间段结算信息开始日期不能小于租约开始日期!");
                return false;
            };
            if (new Date(editDetail.dataParam.CONTRACT_RENT[i].ENDDATE).Format('yyyy-MM-dd')
                > new Date(editDetail.dataParam.CONT_END).Format('yyyy-MM-dd')) {
                iview.Message.info("时间段结算信息结束日期不能大于租约结束日期!");
                return false;
            };
            if ((!editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM) || (editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length == 0)) {
                iview.Message.info("请生成月度分解信息!");
                return false;
            };
            if (editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length > 0) {
                for (var j = 0; j < editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM.length; j++) {
                    if (!editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[j].CREATEDATE) {
                        iview.Message.info("请生成月度分解生成日期不能为空!");
                        return false;
                    };

                    if (!editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[j].JMJE) {
                        editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[j].JMJE = 0;
                    };

                    if (editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[j].JMJE
                        > editDetail.dataParam.CONTRACT_RENT[i].CONTRACT_RENTITEM[j].RENTS) {
                        iview.Message.info("租金月度分解中减免金额不能大于租金金额!");
                        return false;
                    };
                };

            };
        };
    };

    if (editDetail.dataParam.CONTRACT_GROUP.length == 0) {
        iview.Message.info("请确定扣率组信息!");
        return false;
    };
    //增加对扣率信息连续性金额判断
    //增加对扣率信息连续性金额判断
    if (editDetail.dataParam.CONTJSKL.length != 0) {
        for (var i = 0; i < editDetail.dataParam.CONTJSKL.length; i++) {
            for (var j = 0; j < editDetail.dataParam.CONTJSKL.length; j++) {
                if (
                    (editDetail.dataParam.CONTJSKL[i].INX == editDetail.dataParam.CONTJSKL[j].INX) &&
                    (editDetail.dataParam.CONTJSKL[i].GROUPNO == editDetail.dataParam.CONTJSKL[j].GROUPNO) &&
                    (j > i) &&
                    ((parseFloat(editDetail.dataParam.CONTJSKL[j].SALES_START) < parseFloat(editDetail.dataParam.CONTJSKL[i].SALES_END)) ||
                      (parseFloat(editDetail.dataParam.CONTJSKL[j].SALES_END) < parseFloat(editDetail.dataParam.CONTJSKL[i].SALES_END)) ||
                    (parseFloat(editDetail.dataParam.CONTJSKL[j].SALES_START) < parseFloat(editDetail.dataParam.CONTJSKL[i].SALES_START)) ||
                      (parseFloat(editDetail.dataParam.CONTJSKL[j].SALES_END) < parseFloat(editDetail.dataParam.CONTJSKL[i].SALES_START))
                    )
                   ) {
                    iview.Message.info("扣率组销售额段之间有重叠!");
                    return false;

                }
            };
        };
    };

    if (editDetail.dataParam.CONTRACT_COST.length != 0) {
        for (var i = 0; i < editDetail.dataParam.CONTRACT_COST.length; i++) {
            if (!editDetail.dataParam.CONTRACT_COST[i].SFFS) {
                iview.Message.info("请确定每月收费项目中的收费方式!");
                return false;
            };

            if (((editDetail.dataParam.CONTRACT_COST[i].SFFS == 1)
                || (editDetail.dataParam.CONTRACT_COST[i].SFFS == 2))
                && ((!editDetail.dataParam.CONTRACT_COST[i].COST) || (editDetail.dataParam.CONTRACT_COST[i].COST <= 0))
                ) {
                iview.Message.info("请确定每月收费项目中的固定费用型收费方式对应的金额!");
                return false;
            }
            if ((editDetail.dataParam.CONTRACT_COST[i].SFFS == 3)
                && ((!editDetail.dataParam.CONTRACT_COST[i].KL) || (editDetail.dataParam.CONTRACT_COST[i].KL <= 0))
                ) {
                iview.Message.info("请确定每月收费项目中正确的销售金额比例!");
                return false;
            }
        };
    };

    if (editDetail.dataParam.CONTRACT_PAY.length != 0) {
        for (var i = 0; i < editDetail.dataParam.CONTRACT_PAY.length; i++) {
            if (!editDetail.dataParam.CONTRACT_PAY[i].TERMID) {
                iview.Message.info("请确定手续费对应的费用项目!");
                return false;
            };
            if (!editDetail.dataParam.CONTRACT_PAY[i].PAYID) {
                iview.Message.info("请确定手续费对应的收款方式!");
                return false;
            };
            if (!editDetail.dataParam.CONTRACT_PAY[i].STARTDATE) {
                iview.Message.info("请确定手续费对应的收款方式的起始日期!");
                return false;
            };
            if (!editDetail.dataParam.CONTRACT_PAY[i].ENDDATE) {
                iview.Message.info("请确定手续费对应的收款方式的结束日期!");
                return false;
            };
        };
    };
    editDetail.dataParam.CONTRACT_UPDATE = [];
    editDetail.dataParam.CONTRACT_UPDATE.push({
        CONTRACTID_OLD: editDetail.dataParam.CONTRACT_OLD,
        JHRQ: editDetail.dataParam.JHRQ
    });


    if (editDetail.screenParam.TQFKR.length != 0) {
        editDetail.dataParam.TQFKR = editDetail.screenParam.TQFKR.join(',');
    };
    return true;
}



editDetail.showOne = function (data, callback) {
    _.Ajax('SearchContract', {
        Data: { CONTRACTID: data }
    }, function (data) {
        $.extend(editDetail.dataParam, data.contract);
        if (!data.contract.CONTRACT_OLD) {
            editDetail.dataParam.BILLID = null;
            editDetail.dataParam.CONTRACTID = null;
            editDetail.dataParam.CONTRACT_OLD = data.contract.CONTRACTID;
        }
        else {
            editDetail.dataParam.BILLID = data.contract.CONTRACTID;
            editDetail.dataParam.CONTRACT_OLD = data.contract.CONTRACT_OLD;
        };



        editDetail.dataParam.CONTRACT_BRAND = data.contractBrand;
        editDetail.dataParam.CONTRACT_SHOP = data.contractShop;
        editDetail.dataParam.CONTRACT_RENT = data.ContractParm.CONTRACT_RENT;
        editDetail.dataParam.CONTRACT_GROUP = data.ContractParm.CONTRACT_GROUP;
        editDetail.dataParam.CONTJSKL = data.ContractParm.CONTJSKL;
        Vue.set(editDetail.dataParam.CONTRACT_RENT, "CONTRACT_RENTITEM", data.ContractRentParm.CONTRACT_RENTITEM);
        editDetail.dataParam.CONTRACT_COST = data.contractCost;
        editDetail.dataParam.CONTRACT_PAY = data.contractPay;

        if (data.contract.TQFKR) {
            Vue.set(editDetail.screenParam, "TQFKR", data.contract.TQFKR.split(',') || []);
        };

        callback && callback(data);
    });
};
editDetail.mountedInit = function () {
    _.Ajax('SearchInit', {
        Data: {}
    }, function (data) {
        Vue.set(editDetail.screenParam, "FEERULE", data.rows);
    });
};


function getYears(date1, date2) { //获取两个年份之差
    var years = date2.getFullYear() - date1.getFullYear();
    return years;
};

function getNextYears(date) { //获取当前日前的下一年上一天
    var tomYear = new Date(date);
    tomYear.setFullYear(tomYear.getFullYear() + 1); //下一年的今天
    tomYear.setDate(tomYear.getDate() - 1); //下一年的昨天

    var tomYear = new Date(tomYear).Format('yyyy-MM-dd');
    return (tomYear);
};

function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var lastDay = new Date(date); //日前复制防止原来日期发生变化
    lastDay.setDate(lastDay.getDate() + days); //日期加天数
    var lastDay = new Date(lastDay).Format('yyyy-MM-dd');
    return lastDay;
};
