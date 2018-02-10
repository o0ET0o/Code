﻿using System.Data;
using z.MVC5.Results;
using z.ERP.Entities;
using System.Collections.Generic;
using z.Extensions;
using System;
using z.ERP.Entities.Enum;
using z.Exceptions;

namespace z.ERP.Services
{
    public class DpglService : ServiceBase
    {
        internal DpglService()
        {
        }
        public DataGridResult GetAssetChange(SearchItem item)
        {
            string sql = $@"SELECT * FROM ASSETCHANGE WHERE 1=1 ";
            item.HasKey("BILLID", a => sql += $" and BILLID LIKE '%{a}%'");
            item.HasKey("BRANCHID", a => sql += $" and BRANCHID  LIKE '%{a}%'");
            sql += " ORDER BY  BILLID DESC";
            int count;
            DataTable dt = DbHelper.ExecuteTable(sql, item.PageInfo, out count);
            return new DataGridResult(dt, count);
        }

        public void DeleteAssetChange(List<ASSETCHANGEEntity> DeleteData)
        {
            foreach (var item in DeleteData)
            {
                ASSETCHANGEEntity Data = DbHelper.Select(item);
                if (Data.STATUS == ((int)普通单据状态.审核).ToString())
                {
                    throw new LogicException("已经审核不能删除!");
                }
            }
            using (var Tran = DbHelper.BeginTransaction())
            {
                foreach (var item in DeleteData)
                {
                    DbHelper.Delete(item);
                }
                Tran.Commit();
            }
        }

        public string SaveAssetChange(ASSETCHANGEEntity SaveData)
        {
            var v = GetVerify(SaveData);
            if (SaveData.BILLID.IsEmpty())
                SaveData.BILLID = NewINC("ASSETCHANGE");
            SaveData.STATUS = ((int)普通单据状态.未审核).ToString();
            SaveData.REPORTER = employee.Id;
            SaveData.REPORTER_NAME = employee.Name;
            SaveData.REPORTER_TIME = DateTime.Now.ToString();
            SaveData.VERIFY = employee.Id;
            v.Require(a => a.BILLID);
            v.Require(a => a.CHANGE_TYPE);
            v.Require(a => a.BRANCHID);
            v.Verify();

            using (var Tran = DbHelper.BeginTransaction())
            {
                SaveData.ASSETCHANGEITEM2?.ForEach( newasset=>
                {
                    GetVerify(newasset).Require(a => a.ASSETID);
                });
                DbHelper.Save(SaveData);

                Tran.Commit();
            }
            return SaveData.BILLID;
        }


        public object GetAssetChangeElement(ASSETCHANGEEntity Data)
        {
             //此处校验一次只能查询一个单号,校验单号必须存在
            string sql = $@"SELECT * FROM ASSETCHANGE WHERE 1=1 ";
            if (!Data.BILLID.IsEmpty())
                sql += (" AND BILLID= " + Data.BILLID);
            DataTable assetchange = DbHelper.ExecuteTable(sql);



            string sqlitem = $@"SELECT M.* " +
                " FROM ASSETCHANGEITEM M " +
                " where 1=1 ";
            if (!Data.BILLID.IsEmpty())
                sqlitem += (" and M.BILLID= " + Data.BILLID);
            DataTable assetchangeitem = DbHelper.ExecuteTable(sqlitem);

            var result = new
            {
                assetchange = assetchange,
                assetchangeitem= assetchange
            };
            return result;
        }
    }
}
