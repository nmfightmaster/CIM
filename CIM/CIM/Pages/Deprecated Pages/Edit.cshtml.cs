using CIM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CIM.Pages
{
    public class EditModel : PageModel
    {
        private readonly IDeviceService _deviceService;
        public EditModel(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }
        [BindProperty(SupportsGet = true)]
        public string Name { get; set; }
        public void OnGetAsync()
        {
        }
    }
}
