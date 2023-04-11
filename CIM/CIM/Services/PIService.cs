using CIM.Data;
using CIM.Models;
using Microsoft.EntityFrameworkCore;

namespace CIM.Services
{
    public class PIService : IPIService
    {
        private readonly CIMContext _context;

        public PIService(CIMContext context)
        {
            _context = context;
        }

        public async Task<PreviousIssue> FindAsync(int id)
        {
            return await _context.PreviousIssues
                .FindAsync(id);
        }
        public async Task<List<PreviousIssue>> GetAllAsync()
        {
            return await _context.PreviousIssues
                .Include(pi => pi.Device)
                .ToListAsync();
        }
        public async Task<PreviousIssue> CreateAsync(PreviousIssue previousIssue)
        {
            _context.Add(previousIssue);
            await _context.SaveChangesAsync();
            return previousIssue;
        }
        public async Task<PreviousIssue> UpdateAsync(PreviousIssue previousIssue)
        {
            _context.Update(previousIssue);
            await _context.SaveChangesAsync();
            return previousIssue;
        }
    }
}
