using CIM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections;

namespace CIM.Data.Configurations
{
    public class DeviceConfiguration : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.HasMany(d => d.PreviousIssues)
               .WithOne(pi => pi.Device)
               .HasForeignKey(pi => pi.DeviceId)
               .OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Name)
                .HasMaxLength(9);
            builder.Property(x => x.ServiceTag)
                .HasMaxLength(7);
            builder.HasData(new List<Device>
            {
                new Device { Id = 1,Name = "CHASTEST",ServiceTag = "1234abc",OU="\\chas.local\\CLINIC\\DEPT\\",PU="Biggles T. McClure",Status="Deployable"},
                new Device { Id = 2,Name = "CHASTEST2",ServiceTag = "5678def",OU="\\chas.local\\CLINIC2\\DEPT2\\",PU="Bo 'Bobo' BoBoBo",Status="Needs Imaged"},
                new Device { Id = 3,Name = "CHASTEST3",ServiceTag = "910ghij",OU="\\chas.local\\CLINIC3\\DEPT3\\",PU="Hugh Mungus",Status="Deployed"}
            });
                
        }
    }
}
