using CIM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections;

namespace CIM.Data.Configurations
{
    public class PreviousIssueConfiguration : IEntityTypeConfiguration<PreviousIssue>
    {
        public void Configure(EntityTypeBuilder<PreviousIssue> builder)
        {
            builder.HasData(new List<PreviousIssue>
            {
                new PreviousIssue { Id = 1,IssueType = "Hardware", IssueDetails = "Screen Cracked",Technician = "Bobo",DeviceId = 1},
                new PreviousIssue { Id = 2,IssueType = "Software", IssueDetails = "Blue Screen",Technician = "Bobo",DeviceId = 1},
                new PreviousIssue { Id = 3,IssueType = "Hardware", IssueDetails = "Screen Cracked2",Technician = "Bibi",DeviceId = 2},
                new PreviousIssue { Id = 4,IssueType = "Software", IssueDetails = "Blue Screen2",Technician = "Bibi",DeviceId = 2},
                new PreviousIssue { Id = 5,IssueType = "Hardware", IssueDetails = "Screen Cracked3",Technician = "Baba",DeviceId = 3},
                new PreviousIssue { Id = 6,IssueType = "Software", IssueDetails = "Blue Screen3",Technician = "Baba",DeviceId = 3}
            });

        }
    }
}
