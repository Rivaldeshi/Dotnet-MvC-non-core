using System.Data.Entity;
using WebApplication3.Models;
using System;
namespace WebApplication3.DAL
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public UserContext() : base("DefaultConnection")
        {
  
           
        }

        
    }
}