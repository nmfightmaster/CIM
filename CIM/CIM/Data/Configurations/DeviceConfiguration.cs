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
                
        }
    }
    {
    }
}
