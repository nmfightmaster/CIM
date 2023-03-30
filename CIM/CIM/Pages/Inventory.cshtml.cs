using CIM.Models;
using CIM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CIM.Pages
{
    public class InventoryModel : PageModel
    {
        private readonly IDeviceService _deviceService;
        public void OnGet()
        {
            
        }
    }
}
