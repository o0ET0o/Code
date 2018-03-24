﻿using z.ERP.Web.Areas.Base;
using System.Web.Mvc;
using z.ERP.Entities;
using z.Extensions;
using System;
using System.Collections.Generic;
using z.MVC5.Results;
using z.ERP.Model;
using z.ERP.Entities.Enum;
using System.Data;
using z.MathTools;

namespace z.ERP.Web.Areas.SHGL.MERCHANT
{
    public class MerchantController : BaseController
    {
        public ActionResult MerchantList()
        {
            List<MERCHANTEntity> list = new List<MERCHANTEntity>() {
                 new MERCHANTEntity() {  BANK="1", PHONE="0"  },  //例子,BANK 是权重,PHONE 是要分配的值
                 new MERCHANTEntity() {  BANK="2"  },
                 new MERCHANTEntity() {  BANK="3"  }
            };
            AllocationSettings<MERCHANTEntity> settings = new AllocationSettings<MERCHANTEntity>()
            {
                AllQty = 1000,  //总共要分配的值
                RoundCent = 2,   //小数位数
                Rounding = RoundingType.Normal,  //舍入方式
                SetValue = (aa, k) => aa.PHONE = k.ToString(),   //设置值的方式,这个方法用来设置分配好的值
                GetValue = aa => aa.PHONE.ToDouble(),   //取值方式,这个方法用来把设置好的值取出来
                Allocation = new WeightingAllocationMatch<MERCHANTEntity>() //分配方式,这个是加权分配
                {
                    WeightingValue = aa => aa.BANK.ToInt()  //加权分配取到权重
                },
                //Allocation = new EqualAllocationMatch<MERCHANTEntity>() //分配方式,这个是平均分配,所以不需要权重
                //{
                //},
                Tail = new MaxTailMatch<MERCHANTEntity>() //尾差计算方式,这个是把尾差放在最大的上
                {
                    Min = true  //设置这个值,说明把尾差放在最小的上
                }
                //Tail = new LastTailMatch<MERCHANTEntity>()//尾差计算方式,这个是把尾差放在第一个
                //{
                //    First = true
                //}
            };
            list.Allocation(settings);

            ViewBag.Title = "商户列表信息";
            return View();
        }


        public ActionResult Detail(string Id)
        {
            ViewBag.Title = "商户信息浏览";
            var entity = service.ShglService.GetMerchantElement(new MERCHANTEntity(Id));
            ViewBag.merchant = entity.Item1;
            ViewBag.merchantBrand = entity.Item2;
            // ViewBag.MERCHANTID = Id;
            return View();
        }


        public ActionResult MerchantEdit(string Id)
        {
            ViewBag.Title = "商户信息编辑";
            return View(model: Id);
        }

        public void Delete(List<MERCHANTEntity> DeleteData)
        {
            service.ShglService.DeleteMerchant(DeleteData);
        }

        public string Save(MERCHANTEntity SaveData)
        {
            return service.ShglService.SaveMerchant(SaveData);
        }
        public UIResult SearchMerchant(MERCHANTEntity Data)
        {
            var res = service.ShglService.GetMerchantElement(Data);
            return new UIResult(
                new
                {
                    merchant = res.Item1,
                    merchantBrand = res.Item2
                }
            );
        }
        public UIResult GetBrand(BRANDEntity Data)
        {
            return new UIResult(service.DataService.GetBrand(Data));
        }
        public void ExecData(MERCHANTEntity Data)
        {
            service.ShglService.ExecData(Data);
        }
    }
}