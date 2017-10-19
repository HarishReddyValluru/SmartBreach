using System.Configuration;
using System.Web;

namespace SmartBreach.Mvc.Util
{
    public class ClientSideRequestContext
    {
        public ClientSideRequestContext()
        {
            PathAPI = WebConstants.Api_Root_FromMVC;
            WebAPI_UrlPath = WebConstants.WebAPI_UrlPath;
            PathLIB = VirtualPathUtility.ToAbsolute(WebConstants.StaticContent_Root_FromMVC + WebConstants.StaticContent_LibStyleLocal_Root);
            PathSPA = VirtualPathUtility.ToAbsolute(WebConstants.StaticContent_Root_FromMVC + WebConstants.StaticContent_SPALocal_Root);
            PathImage = VirtualPathUtility.ToAbsolute(WebConstants.StaticContent_Root_FromMVC + WebConstants.StaticContent_Style_Root + WebConstants.StaticContent_ImageLocal_Root);
            int idleWarnAfter, idleTimeout, keepaliveInterval;
            IdleWarnAfter = int.TryParse(ConfigurationManager.AppSettings["IdleWarnAfter"], out idleWarnAfter)
                ? idleWarnAfter
                : 14;
            IdleTimeout = int.TryParse(ConfigurationManager.AppSettings["IdleTimeout"], out idleTimeout)
                ? idleTimeout
                : 14;
            KeepaliveInterval = int.TryParse(ConfigurationManager.AppSettings["KeepaliveInterval"], out keepaliveInterval)
                ? keepaliveInterval
                : 5;
            string cookieToken, formToken;
            System.Web.Helpers.AntiForgery.GetTokens(null, out cookieToken, out formToken);
            VerificationToken = cookieToken + ":" + formToken;
        }

        /// <summary>path to the data source -- webapi</summary>
        public string PathAPI { get; private set; }

        public string WebAPI_UrlPath { get; private set; }

        /// <summary>path to the javascript librarires folder</summary>
        public string PathLIB { get; private set; }

        /// <summary>path to the SPA folder -- where our custom app scripts & partials live</summary>
        public string PathSPA { get; private set; }

        /// <summary>path to the images folder</summary>
        public string PathImage { get; private set; }

        /// <summary>number of minutes before idle warning should display</summary>
        public int IdleWarnAfter { get; private set; }

        /// <summary>number of minutes before idle timeout occurs</summary>
        public int IdleTimeout { get; private set; }

        /// <summary>number of minutes between keepalive ping requests</summary>
        public int KeepaliveInterval { get; private set; }

        public string VerificationToken { get; private set; }

        public string GIBrandingDomain { get; set; }

        public string GIBrandingName { get; set; }
    }
}