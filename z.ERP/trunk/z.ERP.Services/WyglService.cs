﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using z.ERP.Entities;
using z.ERP.Entities.Enum;
using z.Extensions;
using z.MVC5.Results;

namespace z.ERP.Services
{
    public class WyglService:ServiceBase
    {
        internal WyglService()
        {

        }
        public DataGridResult GetEnergyreGister(SearchItem item)
        {
            string sql = $@"select * from ENERGY_REGISTER where 1=1 ";
            item.HasKey("BILLID", a => sql += $" and BILLID = '{a}'");
            item.HasKey("CHECK_DATE_START", a => sql += $" and CHECK_DATE>= to_date('{a.ToDateTime().ToLocalTime()}','YYYY-MM-DD  HH24:MI:SS')");
            item.HasKey("CHECK_DATE_END", a => sql += $" and CHECK_DATE<= to_date('{a.ToDateTime().ToLocalTime()}','YYYY-MM-DD  HH24:MI:SS')");
            sql += " order by BILLID desc";
            int count;
            DataTable dt = DbHelper.ExecuteTable(sql, item.PageInfo, out count);
            return new DataGridResult(dt, count);
        }

        public string SaveEnergyreGister(ENERGY_REGISTEREntity SaveData)
        {
            var v = GetVerify(SaveData);
            
            SaveData.CHECK_DATE.ToDateTime();
            if (SaveData.BILLID.IsEmpty())
            {
                SaveData.BILLID = NewINC("ENERGY_REGISTER");
            }
            
            SaveData.REPORTER = employee.Id;
            SaveData.REPORTER_NAME = employee.Name;
            SaveData.REPORTER_TIME = DateTime.Now.ToString();
            SaveData.STATUS = ((int)普通单据状态.未审核).ToString();
            
            v.Require(a => a.BILLID);
            v.Require(a => a.CHECK_DATE);
            v.Require(a => a.YEARMONTH);
            v.Verify();

            SaveData.ENERGY_REGISTER_ITEM.ForEach(sdb =>
            {
                GetVerify(sdb).Require(a => a.FILEID);
                GetVerify(sdb).Require(a => a.AMOUNT);
            });
            v.Verify();
            DbHelper.Save(SaveData);
            return SaveData.BILLID;
        }
        

        public object GetEnergyreGisterElement(string BILLID)
        {
            string sql = $@"select * from ENERGY_REGISTER where 1=1 ";
            if (!BILLID.IsEmpty())
                sql += (" and BILLID= " + BILLID);         
            DataTable dt = DbHelper.ExecuteTable(sql);


            
            string sqlitem = $@"SELECT M.*,E.FILECODE,E.FILENAME,P.CODE,P.NAME " +
                " FROM ENERGY_REGISTER_ITEM M,ENERGY_FILES E,SHOP P " +
                " where M.FILEID = E.FILEID and M.SHOPID = P.SHOPID";
            if (!BILLID.IsEmpty())
                sqlitem += (" and BILLID= " + BILLID);            
            DataTable dtitem = DbHelper.ExecuteTable(sqlitem);

            var result = new
            {
                main = dt,
                item = dtitem
            };

            //return new { main = new DataGridResult(dt,1),item = new DataGridResult(dtitem)};
            return result;
        }


    }
}