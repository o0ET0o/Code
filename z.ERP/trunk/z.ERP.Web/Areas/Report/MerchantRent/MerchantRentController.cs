﻿using System.Web.Mvc;
using z.ERP.Web.Areas.Base;
using z.MVC5.Results;

namespace z.ERP.Web.Areas.Report.MerchantRent
{
    public class MerchantRentController : BaseController
    {
        public ActionResult MerchantRent()
        {
            ViewBag.Title = "商户租金计提表";
            return View();
        }

        public UIResult SearchCate()
        {
            var res = service.DataService.GetTreeCategory();
            return new UIResult(
                new
                {
                    treeOrg = res.Item1
                }
            );
        }

        public string Output(SearchItem item)
        {
            return service.ReportService.MerchantRentOutput(item);
        }
    }
}