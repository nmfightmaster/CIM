using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;

namespace CIM.Pages.PreviousIssues
{
    public class DeleteModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public DeleteModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        [BindProperty]
      public PreviousIssue PreviousIssue { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.PreviousIssues == null)
            {
                return NotFound();
            }

            var previousissue = await _context.PreviousIssues.FirstOrDefaultAsync(m => m.Id == id);

            if (previousissue == null)
            {
                return NotFound();
            }
            else 
            {
                PreviousIssue = previousissue;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            
            if (id == null || _context.PreviousIssues == null)
            {
                return NotFound();
            }
            var previousissue = await _context.PreviousIssues.FindAsync(id);
            id = previousissue.DeviceId;
            if (previousissue != null)
            {
                PreviousIssue = previousissue;
                _context.PreviousIssues.Remove(PreviousIssue);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("../Devices/Details", new { id });
        }
    }
}
