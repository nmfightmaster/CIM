using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CIM.Data;
using CIM.Models;
using System.Diagnostics;

namespace CIM.Pages.PreviousIssues
{
    public class CreateModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;
        [BindProperty]
        public int id { get; set; }
        [BindProperty]
        public PreviousIssue PreviousIssue { get; set; } = default!;
        public string[] issueTypes = new[] { "Hardware", "Software" };

        public CreateModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }  

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid || PreviousIssue == null)
            {
                return Page();
            }
            PreviousIssue.DeviceId = id;
            _context.PreviousIssues.Add(PreviousIssue);
            await _context.SaveChangesAsync();

            return RedirectToPage("../Devices/Details", new { id });
        }
    }
}
