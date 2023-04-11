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
    public class DetailsModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public DetailsModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

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
    }
}
