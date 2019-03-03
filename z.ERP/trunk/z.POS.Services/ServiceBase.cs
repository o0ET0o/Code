﻿using System;
using System.Collections.Generic;
using z.Context;
using z.DBHelper.DBDomain;
using z.DBHelper.Helper;
using z.Extensions;
using z.IOC.Simple;
using z.LogFactory;
using z.SSO;
using z.SSO.Model;
using z.Verify;

namespace z.POS.Services
{
    #region 基础实现
    public class ServiceBase
    {
        SimpleIOC ioc;
        public ServiceBase()
        {
            List<Type> mrs = new List<Type>();
            //mrs.Add(typeof(TestServiceOverride));
            ioc = new SimpleIOC(mrs);
        }

        protected DbHelperBase DbHelper
        {
            get
            {
                return ApplicationContextBase.GetContext().GetData<DbHelperBase>("db", () =>
                {
                    return new OracleDbHelper(ConfigExtension.GetConfig("connection"));
                });
            }
        }

        //public void SetDb(DbHelperBase db)
        //{
        //    _db = db;
        //}
        //DbHelperBase _db;

        //public DbHelperBase DbHelper
        //{
        //    get
        //    {
        //        if (_db == null)
        //        {
        //            throw new Exception("初始化异常");
        //        }
        //        return _db;
        //    }
        //}
        static readonly DbHelperBase _db = new OracleDbHelper(ConfigExtension.GetConfig("connection"));

        #region Service  
        public CommonService CommonService
        {
            get
            {
                return ioc.Create<CommonService>();
            }
        }

        public HomeService HomeService
        {
            get
            {
                return ioc.Create<HomeService>();
            }
        }

        public PosService PosService
        {
            get
            {
                return ioc.Create<PosService>();
            }
        }


        #endregion

        #region 通用方法


        /// <summary>
        /// 获取对象的验证类
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public EntityVerify<TEntity> GetVerify<TEntity>(TEntity entity) where TEntity : TableEntityBase
        {
            EntityVerify<TEntity> v = new EntityVerify<TEntity>(entity);
            v.SetDb(DbHelper);
            return v;
        }


        #endregion


        #region 属性
        /// <summary>
        /// 当前登录对象
        /// </summary>
        protected Employee employee
        {
            get
            {
                return UserApplication.GetUser<Employee>();
            }
        }

        protected LogWriter Log
        {
            get
            {
                return new LogWriter("Controller");
            }
        }


        #endregion

    }
    #endregion
}
