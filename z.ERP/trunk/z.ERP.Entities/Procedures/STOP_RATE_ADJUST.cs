﻿using z.DBHelper.DBDomain;

namespace z.ERP.Entities.Procedures
{
    [DbProcedure("STOP_RATE_ADJUST")]
    public class STOP_RATE_ADJUST : ProcedureEntityBase
    {
        [ProcedureField("in_ID")]
        public string in_ID
        {
            get;
            set;
        }
        [ProcedureField("in_USERID")]
        public string in_USERID
        {
            get;
            set;
        }
    }
}
