﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2017/12/2 0:49:28
 * 生成人：书房
 * 代码生成器版本号：1.2.6545.1474
 *
 */ 

using System.Data;
using z.DbHelper.DbDomain;

namespace z.ERP.Entities
{
    [DbTable("ORG", "")]
    public partial class ORGEntity : EntityBase
    {
        public ORGEntity()
        {
        }

        public ORGEntity(string orgid)
        {
            ORGID = orgid;
        }

        /// <summary>
        /// 
        /// <summary>
        [PrimaryKey]
        public string ORGID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string ORGCODE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string ORGNAME
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string ORG_TYPE
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string LEVEL_LAST
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string CREATE_TIME
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string BRANCHID
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        [DbType(DbType.DateTime)]
        public string UPDATE_TIME
        {
            get; set;
        }
        /// <summary>
        /// 
        /// <summary>
        public string VOID_FLAG
        {
            get; set;
        }
    }
}
