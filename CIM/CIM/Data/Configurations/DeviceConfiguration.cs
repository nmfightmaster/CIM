using CIM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CIM.Data.Configurations
{
    public class DeviceConfiguration : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.Property(x => x.Name)
                .HasMaxLength(9);
            builder.Property(x => x.ServiceTag)
                .HasMaxLength(7);
            builder.HasData(new List<Device>
            {
                new Device { Id = 1,Name = "CHASTEST",ServiceTag = "1234abc",OU="\\chas.local\\CLINIC\\DEPT\\",PU="Biggles T. McClure",PI="monitor issues",Status="Deployable"},
                new Device { Id = 2,Name = "CHASTEST2",ServiceTag = "5678def",OU="\\chas.local\\CLINIC2\\DEPT2\\",PU="Bo 'Bobo' BoBoBo",PI="wifi issues",Status="Needs Imaged"},
                new Device { Id = 3,Name = "CHASTEST3",ServiceTag = "910ghij",OU="\\chas.local\\CLINIC3\\DEPT3\\",PU="Hugh Mungus",PI="self esteem issues",Status="Deployed"}
            });
                
        }
    }
}
