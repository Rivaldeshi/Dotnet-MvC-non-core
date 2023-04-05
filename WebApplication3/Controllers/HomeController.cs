using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication3.DAL;
using WebApplication3.Models;
namespace WebApplication3.Controllers
{
    public class HomeController : Controller
    {

        private readonly UserContext _context = new UserContext();
        // GET: Users
        public ActionResult Index()
        {
            string filePath = Server.MapPath("~/Views/Users/Index.html");
            string html = System.IO.File.ReadAllText(filePath);

            return new ContentResult
            {
                Content = html,
                ContentType = "text/html"
            };

        }




    }
}