﻿using System.Web.Mvc;
using z.ERP.Entities;
using z.ERP.Web.Areas.Base;
using z.Extensions;

namespace z.ERP.Web.Areas.XTGL.FKFS
{
    public class FkfsController:BaseController
    {
        public ActionResult Fkfs() {

            return View();
        }

        public string Save(FKFSEntity DefineSave)
        {
            var v = GetVerify(DefineSave);
            if (DefineSave.ID.IsEmpty())
                DefineSave.ID = service.CommonService.NewINC("FKFS");
            v.Require(a => a.NAME);
            v.IsNumber(a => a.ID);            
            v.IsUnique(a => a.NAME);
            v.Verify();
            return CommonSave(DefineSave);
        }
        public void Delete(FKFSEntity DefineDelete)
        {
            var v = GetVerify(DefineDelete);
            v.Require(a => a.ID);
            v.Verify();
            CommenDelete(DefineDelete);
        }
        
    }
}