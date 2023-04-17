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
        private readonly IDellService _dellService;

        public DetailsModel(CIM.Data.CIMContext context, IDellService dellService)
        {
            _context = context;
            _dellService = dellService;
        }
        public Device Device { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(string? name)
        {
            if (name == null || _context.Devices == null)
            {
                return NotFound();
            }
            var device = await _context.Devices.Include(d => d.PreviousIssues)
                .FirstOrDefaultAsync(d => d.Name == name);
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
