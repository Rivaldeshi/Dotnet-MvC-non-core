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
    public class UsersController : Controller
    {
        private readonly UserContext _context = new UserContext();

        public static List<User> _users = new List<User>
        {
         new User {  Name = "John Doe", SurName="alice", Email = "john.doe@example.com",  },
         new User {  Name = "Jane Doe",SurName="bop", Email = "jane.doe@example.com",  },
         new User {  Name = "Bob Smith",SurName="smith", Email = "bob.smith@example.com" }
        };

        // GET: Users
        public ActionResult Index()
        {
            return Json(_users, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Details(Guid id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        // POST: /users
        [HttpPost]
        public ActionResult Create(User user)
        {
            user.Id = Guid.NewGuid();
            _users.Add(user);
            return Json(user);
        }

        // PUT: /users/{id}
        [HttpPut]
        public ActionResult Edit(Guid id, User user)
        {
            var existingUser = _users.FirstOrDefault(u => u.Id == id);
            if (existingUser == null)
            {
                return HttpNotFound();
            }
            existingUser.Name = user.Name;
            existingUser.SurName = user.SurName;
            return Json(existingUser);
        }


        public ActionResult Delete(Guid id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return HttpNotFound();
            }
            _users.Remove(user);
            return new HttpStatusCodeResult(HttpStatusCode.NoContent);
        }

        public ActionResult GetSimilarName(string name)
        {   
            var suggestions = _users
              .Where(u => u.Name.StartsWith(name,StringComparison.OrdinalIgnoreCase))
              .Select(u => new { Name = u.Name })
              .ToList();

            return Json(suggestions, JsonRequestBehavior.AllowGet);
        }


    }
}