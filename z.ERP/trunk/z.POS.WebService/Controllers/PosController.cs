﻿using System.Collections.Generic;
using z.POS.Entities.Pos;
using z.WebServiceBase.Controllers;
using z.WebServiceBase.Model;

namespace z.POS.WebService.Controllers
{
    public class PosController : BaseController
    {
        internal PosController() : base()
        {
          
        }

        public LoginConfigInfo GetConfig()
        {
            return service.PosService.GetConfig();
        }

        /// <summary>
        /// 最大交易号,测试方法,开始做就要删除
        /// </summary>
        /// <returns></returns>
        [ServiceAble("GetLastDealid")]
        public long GetLastDealid()
        {
            return service.PosService.GetLastDealid();
        }

        [ServiceAble("FindGoods")]
        public List<FindGoodsResult> FindGoods(FindGoodsFilter filter)
        {
            return service.PosService.FindGoods(filter);
        }

        [ServiceAble("GetClerkShop")]
        public UserYYYResult GetClerkShop(PersonInfo req)
        {
            return service.PosService.GetClerkShop(req);
        }

        [ServiceAble("GetPayList")]
        public List<FKFSResult> GetPayList()
        {
            return service.PosService.GetPayList();
        }

        [ServiceAble("GetDeal")]
        public SaleRequest GetDeal(GetDealFilter filter)
        {
            return service.PosService.GetDeal(filter);
        }

        [ServiceAble("Sale")]
        public void Sale(SaleRequest Request)
        {
            service.PosService.Sale(Request);
        }

        [ServiceAble("GetSaleSummary")]
        public SaleSummaryResult GetSaleSummary(SaleSummaryFilter filter)
        {
            return service.PosService.GetSaleSummary(filter);
        }

    }
}