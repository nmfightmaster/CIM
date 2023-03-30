using Microsoft.AspNetCore.Mvc;
using CIM.Services;
using CIM.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CIM.Pages
{
    public class InventoryModel : PageModel
    {
        private readonly IDeviceService _deviceService;
        public InventoryModel (IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }
        public List<Device> Devices { get; set; }
        public async Task OnGetAsync() => Devices =
            await  _deviceService.GetAllAsync();
        public void OnGet()
        {
        }
    }
}
