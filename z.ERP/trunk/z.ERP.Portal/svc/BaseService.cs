﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using z.ERP.Services;
using z.Extensions;
using z.LogFactory;

namespace z.ERP.Portal.svc
{
    public class BaseService
    {
        public BaseService()
        {
            service = new ServiceBase();
        }


        protected ServiceBase service
        {
            get;
            set;
        }

        protected LogWriter Log
        {
            get
            {
                return new LogWriter("Service");
            }
        }

        public T LogRun<T>(Func<T> func, params object[] infos)
        {
            if (func == null)
                return default(T);
            try
            {
                if (!infos.IsEmpty())
                    Log.Info("Service", infos);
                T t = func.Invoke();
                Log.Info("Service", t);
                return t;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                throw;
            }
        }

    }
}