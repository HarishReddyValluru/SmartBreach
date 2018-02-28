using System;
using System.Web.Mvc;
using System.Web.Security;
using SmartBreach.Mvc.Util;

namespace GI.FLEX.AdminPortal.MVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var cRC = new ClientSideRequestContext();
            ViewBag.BoostrapJson = cRC.ToJSONString();
            return View();
        }
    }
}