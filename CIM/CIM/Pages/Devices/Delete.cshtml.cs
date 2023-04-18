using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;

namespace CIM.Pages
{
    public class DeleteModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public DeleteModel(CIM.Data.CIMContext context)
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

        public async Task<IActionResult> OnPostAsync(int? id, bool? restore)
        {
            if (id == null)
            {
                return NotFound();
            }

            var device = await _context.Devices.FindAsync(id);

            if (device == null)
            {
                return NotFound();
            }

            if (restore != true)
            {
                device.IsDeleted = true;
                device.DeletedAt = DateTime.Now;
            }
            else
            {
                device.IsDeleted = false;
                device.DeletedAt = null;
            }
            _context.Devices.Update(device);
            await _context.SaveChangesAsync();
            return RedirectToPage("../Index");
        }
    }
}
