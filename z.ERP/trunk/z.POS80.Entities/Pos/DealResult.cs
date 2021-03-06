﻿using System.Collections.Generic;

namespace z.POS80.Entities.Pos
{
    public class DealResult
    {
        public string sale_time
        {
            get; set;
        }
        public string account_date
        {
            get; set;
        }
        public string cashierid
        {
            get; set;
        }
        public string sale_amount
        {
            get; set;
        }
        public string change_amount
        {
            get; set;
        }
        public string member_type
        {
            get; set;
        }
        public string manage_card
        {
            get; set;
        }
        public string posno_old
        {
            get; set;
        }
        public string dealid_old
        {
            get; set;
        }
        public List<GoodsResult> goodslist
        {
            get; set;
        }
        public List<PayResult> paylist
        {
            get; set;
        }
        public List<ClerkResult> clerklist
        {
            get; set;
        }

    }
}
