using System.Web;
using System.Web.Optimization;

namespace WebApplication3
{
    public class BundleConfig
    {
        // Pour plus d'informations sur le regroupement, visitez https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/Jquery/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/script").Include(
            "~/Scripts/script.js"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Css/site.css"));
        }
    }
}
