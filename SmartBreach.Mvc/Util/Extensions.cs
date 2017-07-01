using System;
using System.Net;
using System.Runtime.Serialization.Formatters;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;

namespace SmartBreach.Mvc.Util
{
    public static class Extensions
    {
        private static readonly JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
        {
            Formatting = Formatting.Indented,
            TypeNameHandling = TypeNameHandling.None,
            DateFormatHandling = DateFormatHandling.IsoDateFormat,
            TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple
        };

        public static string ToJSONString(this Object source)
        {
            return ToJSONString(source, jsonSerializerSettings);

        }
        public static string ToJSONString(this Object source, JsonSerializerSettings settings)
        {
            var result = JsonConvert.SerializeObject(source, settings);
            return result;
        }	
    }
}