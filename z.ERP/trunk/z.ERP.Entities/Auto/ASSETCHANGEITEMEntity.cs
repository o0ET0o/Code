﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2017-12-18 23:51:13
 * 生成人：LinAJ
 * 代码生成器版本号：1.2.6537.1447
 *
 */ 

using System.Data;
using z.DbHelper.DbDomain;

namespace z.ERP.Entities
{
    [DbTable("ASSETCHANGEITEM", "")]
    public partial class ASSETCHANGEITEMEntity : EntityBase
    {
        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string BILLID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string ASSETID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string ASSET_TYPE_OLD
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string ASSET_TYPE_NEW
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_BUILD_OLD
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_BUILD_NEW
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_USABLE_OLD
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_USABLE_NEW
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_RENTABLE_OLD
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string AREA_RENTABLE_NEW
        {
            get; set;
        }
    }
}
