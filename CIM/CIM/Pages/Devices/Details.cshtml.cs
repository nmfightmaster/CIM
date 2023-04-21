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
using System.DirectoryServices;
using System.Text.RegularExpressions;

namespace CIM.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;
        private readonly IDellService _dellService;
        private readonly ILDAPService _ldapService;
        public string DeviceWarranty;
        public DetailsModel(CIM.Data.CIMContext context, IDellService dellService, ILDAPService ldapService)
        {
            _context = context;
            _dellService = dellService;
            _ldapService = ldapService;
        }
        public Device Device { get; set; } = default!;
        public string[] imagingSteps { get; set; } = new string[] { "Imaging Script Ran" , "Computer Renamed" , "Dell Command Ran" , "Windows Updates Performed"};
        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.Devices == null)
            {
                return NotFound();
            }
            var device = await _context.Devices.Include(d => d.PreviousIssues)
                .FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
            if (device == null)
            {
                return NotFound();
            }
            else 
            {
                Device = device;
            }
            _dellService.Device = device;
            DeviceWarranty = await _dellService.GetDataAsync();
            Device.OU = await _ldapService.GetOUAsync(Device.Name);
            return Page();
        }
    }
}
