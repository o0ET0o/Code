﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2017-12-19 0:12:01
 * 生成人：LinAJ
 * 代码生成器版本号：1.2.6560.42822
 *
 */ 

using System.Data;
using z.DbHelper.DbDomain;

namespace z.ERP.Entities
{
    [DbTable("CONTRACT_RENT", "合同租金表")]
    public partial class CONTRACT_RENTEntity : EntityBase
    {
        public CONTRACT_RENTEntity()
        {
        }

        /// <summary>
        /// 合同号
        /// <summary>
        [Field("合同号")]
        public string CONTRACTID
        {
            get; set;
        }
        /// <summary>
        /// 时间段
        /// <summary>
        [Field("时间段")]
        public string INX
        {
            get; set;
        }
        /// <summary>
        /// 单价类型
        /// <summary>
        [Field("单价类型")]
        public string DJLX
        {
            get; set;
        }
        /// <summary>
        /// 开始日期
        /// <summary>
        [Field("开始日期")]
        [DbType(DbType.DateTime)]
        public string STARTDATE
        {
            get; set;
        }
        /// <summary>
        /// 结束日期
        /// <summary>
        [Field("结束日期")]
        [DbType(DbType.DateTime)]
        public string ENDDATE
        {
            get; set;
        }
        /// <summary>
        /// 单价
        /// <summary>
        [Field("单价")]
        public string PRICE
        {
            get; set;
        }
        /// <summary>
        /// 月租金
        /// <summary>
        [Field("月租金")]
        public string RENTS
        {
            get; set;
        }
        /// <summary>
        /// 总租金
        /// <summary>
        [Field("总租金")]
        public string SUMRENTS
        {
            get; set;
        }
    }
}
