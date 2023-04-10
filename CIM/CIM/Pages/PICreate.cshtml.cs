using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CIM.Data;
using CIM.Models;

namespace CIM.Pages
{
    public class PICreateModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public PICreateModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["DeviceId"] = new SelectList(_context.Devices, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public PreviousIssue PreviousIssue { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.PreviousIssues == null || PreviousIssue == null)
            {
                return Page();
            }

            _context.PreviousIssues.Add(PreviousIssue);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
