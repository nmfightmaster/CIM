using CIM.Services;
using CIM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace CIM.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly IDeviceService _deviceService;
        public DetailsModel(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }
        [BindProperty(SupportsGet = true)]
        public string Name { get; set; }
        public Device Device { get; set; }
        public PropertyInfo[] PropertiesList { get; set; }
        public async Task<IActionResult> OnGetAsync()
        {
            var devices = await _deviceService.GetDeviceNamesAsync();
            if (devices.Contains(Name.ToLowerInvariant())) 
            {
                Device = await _deviceService.GetByNameAsync(Name);
                if (Device == null) 
                {
                    return NotFound();
                }
                PropertiesList = Device.GetType().GetProperties();
                return Page();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
