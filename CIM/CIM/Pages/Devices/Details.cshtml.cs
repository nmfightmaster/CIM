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
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using CIM.Migrations;

namespace CIM.Pages
{
    [IgnoreAntiforgeryToken]
    public class DetailsModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;
        private readonly IDellService _dellService;
        private readonly ILDAPService _ldapService;
        private readonly ILogger<DetailsModel> _logger;
        public string DeviceWarranty;

        public DetailsModel(CIM.Data.CIMContext context, IDellService dellService, ILDAPService ldapService, ILogger<DetailsModel> logger)
        {
            _context = context;
            _dellService = dellService;
            _ldapService = ldapService;
            _logger = logger;
        }
        public Device Device { get; set; } = default!;
        public string[] imagingSteps { get; set; } = new string[] { "Imaging Script" , "Computer Renamed" , "Dell Command" , "Windows Updates"};
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
            Device.OU = _ldapService.GetOU(Device.Name);
            Device.ImagingStep = JsonConvert.DeserializeObject<bool[]>(Device.ImagingStepJson);
            return Page();
        }
        public async Task<IActionResult> OnPostToggleImage(int id) {
            Device = await _context.Devices.FirstOrDefaultAsync(d => d.Id == id);
            if (Device != null)
            {
                if (Device.Status == "Imaged")
                {
                    Device.Status = "Needs Imaged";
                    Device.ImagingStep = new bool[4] { false, false, false, false };

                } else
                {
                    Device.Status = "Imaged";
                    Device.ImagingStep = new bool[4] { true, true, true, true };
                }
                Device.ImagingStepJson = JsonConvert.SerializeObject(Device.ImagingStep);
                await _context.SaveChangesAsync();
            }
            return RedirectToPage("/Devices/Details", new { id = Device.Id }); 
        }

        public async Task<IActionResult> OnPostStep(bool isChecked, int id, int step)
        {
            Device = await _context.Devices.FirstOrDefaultAsync(d => d.Id == id);
            Device.ImagingStep = JsonConvert.DeserializeObject<bool[]>(Device.ImagingStepJson);
            if (isChecked) {
                Device.ImagingStep[step] = true;
            } else
            {
                Device.ImagingStep[step] = false;
            }
            Device.ImagingStepJson = JsonConvert.SerializeObject(Device.ImagingStep);
            await _context.SaveChangesAsync();
            return RedirectToPage("/Devices/Details", new { id = Device.Id });
        }
    }
}
