using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;

namespace CIM.Pages.Devices
{
    public class PermaDeleteModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public PermaDeleteModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        [BindProperty]
      public Device Device { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.Devices == null)
            {
                return NotFound();
            }

            var device = await _context.Devices.FirstOrDefaultAsync(m => m.Id == id);

            if (device == null)
            {
                return NotFound();
            }
            else 
            {
                Device = device;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.Devices == null)
            {
                return NotFound();
            }
            var device = await _context.Devices.FindAsync(id);

            if (device != null)
            {
                Device = device;
                _context.Devices.Remove(Device);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("../Index");
        }
    }
}
