using System.Configuration;

namespace SmartBreach.Mvc.Util
{
    /// <summary>
    /// Constants used in the various GI 2.0 web projects, like MVC, API, and Static.  It's put down here
    /// so it can be available across the three projects.
    /// </summary>
    public static class WebConstants
    {
        //General 
        //-------------------------------------------------------------------------------------------------------
        /// <summary>The name of the cookie set by the main Web() project</summary>
        public static readonly string ASPNET_AUTHCOOKIE_NAME = "SqlAuthCookie";

        //WebAPI Specific 
        //-------------------------------------------------------------------------------------------------------
        /// <summary>Base path for the API.  Ends with trailing slash</summary>
        public static readonly char FORMSAUTH_TICKET_DELIMITER = '|';

        //Static Content Specific
        //-------------------------------------------------------------------------------------------------------
        public static readonly string Api_Root_FromMVC = ConfigurationManager.AppSettings["SmartBreach.Data.Location"];

        public static readonly string StaticContent_Root_FromMVC = "~/../Static/";

        /// <summary>Local root of our custom javascript -- the *S*ingle *P*age *A*pp if you will</summary>
        public static readonly string StaticContent_SPALocal_Root = "app/";

        /// <summary>Local root of css libraries (think skins, or stuff from telerik)</summary>
        public static readonly string StaticContent_LibStyleLocal_Root = "Scripts/";

        /// <summary>Local root of our hand coded css</summary>
        public static readonly string StaticContent_Style_Root = "Content/";

        /// <summary>Local root of images (think button icons)</summary>
        public static readonly string StaticContent_ImageLocal_Root = "Images/";

        public static readonly string StaticContent_CdnBuild_Root = "build/";
    }
}