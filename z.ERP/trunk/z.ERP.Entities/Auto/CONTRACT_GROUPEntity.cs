﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2018/3/22 0:39:09
 * 生成人：书房
 * 代码生成器版本号：1.2.6655.1027
 *
 */ 

using System.Data;
using z.DBHelper.DBDomain;

namespace z.ERP.Entities
{
    [DbTable("CONTRACT_GROUP", "扣率组")]
    public partial class CONTRACT_GROUPEntity : TableEntityBase
    {
        public CONTRACT_GROUPEntity()
        {
        }

        public CONTRACT_GROUPEntity(string contractid, string groupno)
        {
            CONTRACTID = contractid;
            GROUPNO = groupno;
        }

        /// <summary>
        /// 合同号
        /// <summary>
        [PrimaryKey]
        [Field("合同号")]
        public string CONTRACTID
        {
            get; set;
        }
        /// <summary>
        /// 扣率组
        /// <summary>
        [PrimaryKey]
        [Field("扣率组")]
        public string GROUPNO
        {
            get; set;
        }
        /// <summary>
        /// 基础扣率
        /// <summary>
        [Field("基础扣率")]
        public string JSKL
        {
            get; set;
        }
        /// <summary>
        /// 描述
        /// <summary>
        [Field("描述")]
        public string DESCRIPTION
        {
            get; set;
        }
    }
}
