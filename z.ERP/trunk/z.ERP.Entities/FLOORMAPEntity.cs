﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using z.DBHelper.DBDomain;

namespace z.ERP.Entities
{
    public partial class FLOORMAPEntity
    {
        [ForeignKey(nameof(MAPID), nameof(FLOORSHOPEntity.MAPID))]
        public List<FLOORSHOPEntity> FLOORSHOP
        {
            get;
            set;
        }
    }
}
