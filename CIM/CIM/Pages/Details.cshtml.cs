using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;
using System.Collections;
using static System.Runtime.InteropServices.JavaScript.JSType;
using CIM.Services;

namespace CIM.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public DetailsModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }
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

    }
}
