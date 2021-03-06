﻿/*
 * 这是自动生成的代码文件，请勿做任何修改。
 * 生成时间：2018/3/22 0:39:19
 * 生成人：书房
 * 代码生成器版本号：1.2.6655.1027
 *
 */ 

using System.Data;
using z.DBHelper.DBDomain;

namespace z.ERP.Entities
{
    [DbTable("STATION_PAY", "POS终端支付方式")]
    public partial class STATION_PAYEntity : TableEntityBase
    {
        public STATION_PAYEntity()
        {
        }

        public STATION_PAYEntity(string stationbh, string payid)
        {
            STATIONBH = stationbh;
            PAYID = payid;
        }

        /// <summary>
        /// POS终端编号
        /// <summary>
        [PrimaryKey]
        [Field("POS终端编号")]
        public string STATIONBH
        {
            get; set;
        }
        /// <summary>
        /// 收款方式
        /// <summary>
        [PrimaryKey]
        [Field("收款方式")]
        public string PAYID
        {
            get; set;
        }
    }
}
