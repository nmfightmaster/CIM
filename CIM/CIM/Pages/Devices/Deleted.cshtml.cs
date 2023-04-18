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
    public class DeletedModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public DeletedModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }
        public IList<Device> Devices { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            Devices = await _context.Devices.Where(d => d.IsDeleted).ToListAsync();
            return Page();
        }
        public async Task<IActionResult> OnPostAsync(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null)
            {
                return NotFound();
            }
            device.IsDeleted = false;
            device.DeletedAt = null;
            await _context.SaveChangesAsync();
            return RedirectToPage("../Index");
        }
    }
}
