﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2017/12/2 16:58:56
 * 生成人：书房
 * 代码生成器版本号：1.2.6545.1474
 *
 */ 

using System.Data;
using z.DbHelper.DbDomain;

namespace z.ERP.Entities
{
    [DbTable("DAILYSETTLEMENT", "")]
    public partial class DAILYSETTLEMENTEntity : EntityBase
    {
        public DAILYSETTLEMENTEntity()
        {
        }

        public DAILYSETTLEMENTEntity(string day, string moduleid)
        {
            DAY = day;
            MODULEID = moduleid;
        }

        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string DAY
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string MODULEID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string USERID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string MACHINE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string DATE_START
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string DATE_END
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string STATUS
        {
            get; set;
        }
    }
}
