using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CIM.Data;
using CIM.Models;
using Newtonsoft.Json.Linq;
using System.Security.Policy;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;

namespace CIM.Pages
{
    public class CreateModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public CreateModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Device Device { get; set; } = new Device();
        public string[] statusTypes = new[] { "Imaged","Needs Imaged","Dell Repair In Process" };
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            if (await _context.Devices.AnyAsync(d => d.ServiceTag.ToLower() == Device.ServiceTag.ToLower()))
            {
                ModelState.AddModelError("", "A device with the same service tag already exists.");
                return Page();
            }
            if (await _context.Devices.AnyAsync(d => d.Name.ToLower() == Device.Name.ToLower()))
            {
                ModelState.AddModelError("", "A device with the same name already exists.");
                return Page();
            }
            _context.Devices.Add(Device);
            await _context.SaveChangesAsync();
            return RedirectToPage("../Index");
        } 
    }
}
