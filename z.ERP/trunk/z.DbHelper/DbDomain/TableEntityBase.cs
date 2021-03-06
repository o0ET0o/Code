﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using z;
using z.Extensions;


namespace z.DBHelper.DBDomain
{
    /// <summary>
    /// 所有数据操作类的基类
    /// </summary>
    public class TableEntityBase : EntityBase
    {
        public TableEntityBase()
        {
        }

        /// <summary>
        /// 获取表的名字
        /// </summary>
        /// <returns></returns>
        public string GetTableName()
        {
            return this.GetAttribute<DbTableAttribute>()?.Tablename ?? this.GetType().Name;
        }

        /// <summary>
        /// 获取表的中文名字
        /// </summary>
        /// <returns></returns>
        public string GetComments()
        {
            string str = this.GetAttribute<DbTableAttribute>()?.Tabcomments;
            if (str.IsEmpty())
                str = GetTableName();
            return str;
        }

        /// <summary>
        /// 获取表的字段名
        /// </summary>
        /// <returns></returns>
        public string GetFieldName<T>(Expression<Func<T, string>> p) where T : TableEntityBase
        {
            if (p.Body is MemberExpression)
            {
                MemberExpression me = p.Body as MemberExpression;
                PropertyInfo prop = me.Member as PropertyInfo;
                FieldAttribute fa = prop.GetAttribute<FieldAttribute>();
                return fa == null ? me.Member.Name : fa.Fieldname;
            }
            else
                throw new Exception("此校验只对字段属性生效");
        }

        /// <summary>
        /// 字段是主键
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="p"></param>
        /// <returns></returns>
        public bool IsPrimaryKey<TEntity>(Expression<Func<TEntity, string>> p)
        {
            if (p.Body is MemberExpression)
            {
                MemberExpression me = p.Body as MemberExpression;
                PropertyInfo prop = me.Member as PropertyInfo;
                PrimaryKeyAttribute f = prop.GetAttribute<PrimaryKeyAttribute>();
                return f != null;
            }
            else
                throw new Exception("属性类型不正确");
        }

        /// <summary>
        /// 获取主键
        /// </summary>
        /// <returns></returns>
        public PropertyInfo[] GetPrimaryKey()
        {
            return GetAllField()
                .Where(a => a.GetAttribute<PrimaryKeyAttribute>() != null)
                .ToArray();
        }

        /// <summary>
        /// 获取所有字段
        /// </summary>
        /// <returns></returns>
        public PropertyInfo[] GetAllField()
        {
            return GetType()
                .GetProperties()
                .Where(a => a.GetAttribute<IgnoreAttribute>() == null)
                .Where(a => !a.IsArray())
                .ToArray();
        }

        public PropertyInfo[] GetAllSelectField()
        {
            return GetType()
                .GetProperties()
                .Where(a =>
                {
                    if (a.GetAttribute<IgnoreAttribute>() != null)
                        return false;
                    if (a.GetAttribute<PrimaryKeyAttribute>() != null)
                        return true;
                    if (a.IsArray())
                        return false;
                    if (a.PropertyType == typeof(string))
                        return true;
                    if (!a.PropertyType.IsNullable())
                        return false ;
                    return true;
                })
                .ToArray();
        }

        /// <summary>
        /// 获取插入字段
        /// </summary>
        /// <returns></returns>
        public PropertyInfo[] GetInserrtField()
        {
            return GetAllField()
               .Where(a => a.GetAttribute<InsertIgnoreAttribute>() == null)
               .ToArray();
        }

        /// <summary>
        /// 获取所有不是主键的字段
        /// </summary>
        /// <returns></returns>
        public PropertyInfo[] GetFieldWithoutPrimaryKey()
        {
            return GetAllField()
                .Where(a => a.GetAttribute<PrimaryKeyAttribute>() == null)
                .ToArray();
        }

        /// <summary>
        /// 获取所有外键
        /// </summary>
        /// <returns></returns>
        public PropertyInfo[] GetForeignKey()
        {
            return GetType().GetProperties()
                .Where(a => a.IsArray())
                .Where(a => a.GetAttribute<InsertIgnoreAttribute>() == null)
                .Where(a => a.GetAttribute<ForeignKeyAttribute>() != null)
                .ToArray();
        }

        /// <summary>
        /// 所有的主键都拥有值,没有主键返回true
        /// </summary>
        /// <returns></returns>
        public bool HasAllPrimaryKey()
        {
            PropertyInfo[] prop = GetPrimaryKey();
            if (prop.IsEmpty())
                return true;
            foreach (var p in prop)
            {
                if (p.GetValue(this, null).ToString().IsEmpty())
                    return false;
            }
            return true;
        }

        /// <summary>
        /// 两个对象相等
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool EqualWithPrimary<TEntity>(TEntity t) where TEntity : TableEntityBase
        {
            if (this.GetType() != t.GetType())
                return false;
            PropertyInfo[] p1 = this.GetPrimaryKey();
            if (p1.IsEmpty())
                return false;
            bool equal = true;
            p1.ForEach(p =>
            {
                if (!p.GetValue(this, null).Equals(p.GetValue(t, null)))
                    equal = false;
            });
            return equal;
        }

        /// <summary>
        /// 获取一个类的实例
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public static TableEntityBase Create(Type t)
        {
            return (TableEntityBase)Activator.CreateInstance(
                                              t,
                                              BindingFlags.Instance | BindingFlags.Public,
                                              null,
                                              new object[] { },
                                              null);
        }
    }

}
