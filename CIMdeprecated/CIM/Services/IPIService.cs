using CIM.Models;

namespace CIM.Services
{
    public interface IPIService
    {
        Task<PreviousIssue> CreateAsync(PreviousIssue previousIssue);
        Task<List<PreviousIssue>> GetAllAsync();
        Task<PreviousIssue> FindAsync(int id);
        Task<PreviousIssue> UpdateAsync(PreviousIssue previousIssue);
    }
}
