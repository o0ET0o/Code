﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using z.Extensions;

namespace z.DbHelper.DbDomain
{
    public class PageInfo
    {
        public PageInfo()
        {
        }
        public int PageSize
        {
            get; set;
        }
        public int PageIndex
        {
            get; set;
        }
    }
}
