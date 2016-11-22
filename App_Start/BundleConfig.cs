using System.Web;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",                      
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/global.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/trade").Include(
                      "~/Content/trade.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/trade").Include(
                    "~/Scripts/angular.min.js",
                    "~/Scripts/trade.js"));


            bundles.Add(new StyleBundle("~/Content/message").Include(
                      "~/Content/message.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/message").Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-route.js",
                    "~/Scripts/message.js"));

            bundles.Add(new StyleBundle("~/Content/calendar").Include(
                      "~/Content/calendar.css",
                      "~/Content/jquery-ui-1.10.1.css",
                      "~/Content/santiago.datepicker.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/calendar").Include(                   
                    "~/Scripts/jquery-1.9.1.js",
                    "~/Scripts/jquery-ui-1.10.1.min.js",
                    "~/Scripts/angular.min.js",
                    "~/Scripts/calendar.js"
                    ));

            bundles.Add(new StyleBundle("~/Content/index").Include(
                      "~/Content/index.css",
                      "~/Content/swiper-3.3.1.min.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/index").Include(
                    "~/Scripts/angular.min.js",
                    "~/Scripts/app.js",
                    "~/Scripts/swiper.min.js"
                    ));

            bundles.Add(new StyleBundle("~/Content/market").Include(
                      "~/Content/market.css",
                      "~/Content/swiper-3.3.1.min.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/market").Include(
                    "~/Scripts/angular.min.js",
                    "~/Scripts/market.js",
                    "~/Scripts/swiper.min.js",
                    "~/Scripts/highstock.js",
                    "~/Scripts/mychart.js",
                    "~/Scripts/highcharts-ng.js"
                    ));

            bundles.Add(new ScriptBundle("~/bundles/hubs").Include(
                    "~/Scripts/jquery.signalR-2.2.1.js"
                    ));



        }
    }
}
