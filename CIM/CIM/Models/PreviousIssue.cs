namespace CIM.Models
{
    public class PreviousIssue
    {
        public int Id { get; set; }
        public string IssueType { get; set; }
        public string IssueDetails { get; set; }
        public string Technician { get; set; }
        public DateTime IssueDate { get; set; }
    }
}
