using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;

namespace CIM.Pages.PreviousIssues
{
    public class EditModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public EditModel(CIM.Data.CIMContext context)
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

            var previousissue =  await _context.PreviousIssues.FirstOrDefaultAsync(m => m.Id == id);
            if (previousissue == null)
            {
                return NotFound();
            }
            PreviousIssue = previousissue;
           ViewData["DeviceId"] = new SelectList(_context.Devices, "Id", "Id");
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(PreviousIssue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PreviousIssueExists(PreviousIssue.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool PreviousIssueExists(int id)
        {
          return (_context.PreviousIssues?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
