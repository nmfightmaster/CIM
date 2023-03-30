using Microsoft.EntityFrameworkCore;
using CIM.Models;
namespace CIM.Data
{
    public class CIMContext : DbContext
    {
        public CIMContext(DbContextOptions options) : base(options) 
        {
        
        }
        public DbSet<Device> Devices { get; set; }
    }
}
