﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;

namespace z.Extensiont
{
    public static class ArrayExtensiont
    {

        /// <summary>
        /// 针对更多类型的遍历方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="arr"></param>
        /// <param name="act"></param>
        public static void ForEach<T>(this IEnumerable<T> arr, Action<int, T> act)
        {
            if (!arr.IsEmpty())
                for (int i = 0; i < arr.Count(); i++)
                {
                    act(i, arr.ElementAt(i));
                }
        }

        /// <summary>
        /// 针对更多类型的遍历方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="arr"></param>
        /// <param name="act"></param>
        public static void ForEach<T>(this IEnumerable<T> arr, Action<T> act)
        {
            arr.ForEach((i, a) => act(a));
        }

        /// <summary>
        /// 针对更多类型的遍历方法,返回false跳出循环
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="arr"></param>
        /// <param name="act"></param>
        public static void ForEachWithBreak<T>(this IEnumerable<T> arr, Func<T, bool> act)
        {
            if (!arr.IsEmpty())
                for (int i = 0; i < arr.Count(); i++)
                {
                    if (!act(arr.ElementAt(i)))
                        break;
                }
        }

        /// <summary>
        /// 针对更多类型的遍历方法,返回false跳出循环
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="arr"></param>
        /// <param name="act"></param>
        public static void ForEachWithBreak<T>(this IEnumerable<T> arr, Func<int, T, bool> act)
        {
            if (!arr.IsEmpty())
                for (int i = 0; i < arr.Count(); i++)
                {
                    if (!act(i, arr.ElementAt(i)))
                        break;
                }
        }

        /// <summary>
        /// 修饰数组
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="Distinct">去重</param>
        /// <param name="ClearEmpty">去掉空值</param>
        /// <returns></returns>
        public static IEnumerable<T> Fixed<T>(this IEnumerable<T> list, bool Distinct = true, bool ClearEmpty = true)
        {
            List<T> res = new List<T>();
            list.ForEach(a =>
            {
                if (ClearEmpty && (a == null || string.IsNullOrWhiteSpace(a.ToString())))
                {
                    return;
                }
                res.Add(a);
            });
            if (Distinct)
            {
                res = res?.Distinct().ToList();
            }
            return res;
        }

        /// <summary>
        /// 数组为空
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <returns></returns>
        public static bool IsEmpty<T>(this IEnumerable<T> list)
        {
            return list == null || list.Count() == 0;
        }

        /// <summary>
        /// 数组中存在某值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool Has<T>(this IEnumerable<T> list, T value)
        {
            if (list == null || value == null)
                return false;
            return list.Contains(value);
        }

        /// <summary>
        /// 超级合并字符串
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="separator"></param>
        /// <param name="fun"></param>
        /// <returns></returns>
        public static string SuperJoin<T>(this IEnumerable<T> list, string separator, Func<T, string> fun = null)
        {
            return string.Join(separator, list.Select(a => fun == null ? a.ToString() : fun(a)));
        }

        /// <summary>
        /// 获取集合中最小的值的集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public static T Min2<T>(this IEnumerable<T> list, Func<T, double> selector)
        {
            if (list.IsEmpty())
                return default(T);
            double key = double.MaxValue;
            T outT = default(T);
            list.ForEach(l =>
            {
                if (selector(l) < key)
                {
                    outT = l;
                }
            });
            return outT;
        }

        /// <summary>
        /// 获取集合中最大的值的集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public static T Max2<T>(this IEnumerable<T> list, Func<T, double> selector)
        {
            if (list.IsEmpty())
                return default(T);
            double key = double.MaxValue;
            T outT = default(T);
            list.ForEach(l =>
            {
                if (selector(l) > key)
                {
                    outT = l;
                }
            });
            return outT;
        }
    }
}
