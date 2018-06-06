﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using z.ERP.Web.Areas.Base;
using z.ERP.Web.Areas.Share.Render;
using z.Extensions;
using z.MVC5.Models;
using z.Results;

namespace z.ERP.Web.Areas.Share
{
    public class ShareController : BaseController
    {
        public ActionResult Undefine(UndefineRender render)
        {
            return View(render);
        }
        public ActionResult TextBox(TextBoxRender render)
        {
            return View(render);
        }
        public ActionResult Button(ButtonRender render)
        {
            if (!render.PermissionKey.IsEmpty())
                render.HasPermission = employee.HasPermission(render.PermissionKey);
            else
                render.HasPermission = true;
            return View(render);
        }
        public ActionResult UndefineWindow(UndefineWindowRender render)
        {
            return View(render);
        }
        public ActionResult WindowButton(WindowButtonRender render)
        {
            return View(render);
        }

        public ActionResult Pop(PopRender render)
        {
            return View(render);
        }

        public ActionResult Cascader(CascaderRender render)
        {
            return View(render);
        }

        public ActionResult CommonWindow(CommonWindowRender render)
        {
            return View(render);
        }
        public ActionResult CheckBoxList(CheckBoxListRender render)
        {
            return View(render);
        }
        public ActionResult DateBox(DateBoxRender render)
        {
            return View(render);
        }
        public ActionResult BaseDropDownList(DropDownListRender render)
        {
            return View(render);
        }
        public ActionResult ServiceDropDownList(ServiceDropDownListRender render)
        {
            var fun = render.ServiceMothod.Compile();
            render.Data = fun(service.DataService);
            return View("BaseDropDownList", render);
        }
    }
}