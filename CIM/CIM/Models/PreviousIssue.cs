using System.ComponentModel;

namespace CIM.Models
{
    public class PreviousIssue
    {
        public int Id { get; set; }
        [DisplayName("Issue Type")]
        public string? IssueType { get; set; }
        [DisplayName("Details")]
        public string? IssueDetails { get; set; }
        [DisplayName("Servicing Tech")]
        public string? Technician { get; set; }
        [DisplayName("Date Logged")]
        public string? IssueDate { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public int? DeviceId { get; set; }
        public Device? Device { get; set; }
    }
}
