namespace CIM.Models
{
    public class PreviousIssue
    {
        public int Id { get; set; }
        public string IssueType { get; set; }
        public string IssueDetails { get; set; }
        public string Technician { get; set; }
        public string IssueDate { get; set; } = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
        public int DeviceId { get; set; }
        public Device Device { get; set; }
    }
}
