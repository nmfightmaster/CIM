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
        }
    }
}
