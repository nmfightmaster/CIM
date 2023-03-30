using Microsoft.EntityFrameworkCore;
using CIM.Models;
using CIM.Data.Configurations;

namespace CIM.Data
{
    public class CIMContext : DbContext
    {
        public CIMContext(DbContextOptions options) : base(options) 
        {
        
        }
        public DbSet<Device> Devices { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .ApplyConfiguration(new DeviceConfiguration());
        }
    }
}
