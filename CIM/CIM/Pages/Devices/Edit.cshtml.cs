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

namespace CIM.Pages
{
    public class EditModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public EditModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Device Device { get; set; } = default!;

        public SelectList statusList { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            string[] statuses = { "Deployed", "Needs Imaged", "Ready to Deploy" };
            statusList = new SelectList(statuses);
            if (id == null || _context.Devices == null)
            {
                return NotFound();
            }

            var device =  await _context.Devices.FirstOrDefaultAsync(m => m.Id == id);
            if (device == null)
            {
                return NotFound();
            }
            Device = device;
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

            _context.Attach(Device).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeviceExists(Device.Id))
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

        private bool DeviceExists(int id)
        {
          return (_context.Devices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
