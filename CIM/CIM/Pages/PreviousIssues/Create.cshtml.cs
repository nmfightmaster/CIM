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
using Microsoft.EntityFrameworkCore;

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

        public async Task<IActionResult> OnGetAsync(int id)
        {
            this.id = id;
            return Page();
        }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync(int id)
        {
            if (!ModelState.IsValid || PreviousIssue == null)
            {
                return Page();
                Console.WriteLine("error.");
            }
            PreviousIssue.DeviceId = id;
            _context.PreviousIssues.Add(PreviousIssue);
            await _context.SaveChangesAsync();
            Device device = await _context.Devices.Where(x => x.Id == id).FirstOrDefaultAsync();
            return RedirectToPage("/Devices/Details", new { id = device.Name });
        }
    }
}