﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2017/12/2 16:58:54
 * 生成人：书房
 * 代码生成器版本号：1.2.6545.1474
 *
 */ 

using System.Data;
using z.DbHelper.DbDomain;

namespace z.ERP.Entities
{
    [DbTable("CONTRACT_RENT", "")]
    public partial class CONTRACT_RENTEntity : EntityBase
    {
        public CONTRACT_RENTEntity()
        {
        }

        public CONTRACT_RENTEntity(string contractid, string inx)
        {
            CONTRACTID = contractid;
            INX = inx;
        }

        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string CONTRACTID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string INX
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string DJLX
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string STARTDATE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string ENDDATE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string PRICE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string RENTS
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string SUMRENTS
        {
            get; set;
        }
    }
}
