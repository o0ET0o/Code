﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using z.Extensions;
using z.MVC5.Models;
using z.Results;

namespace z.ERP.Web.Areas.Share.Render
{
    public class EnumCheckBoxListRender<T> : CheckBoxListRender where T : struct
    {
        public EnumCheckBoxListRender()
        {
            Data = EnumExtension.EnumToSelectItem<T>();
        }
    }
}