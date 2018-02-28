using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SmartBreach.Mvc.Startup))]
namespace SmartBreach.Mvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
