using CIM.Models;
using CIM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CIM.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
        [BindProperty]
        public string Device { get; set; }

        public IActionResult OnPost()
        {
            string url = $"/Details/{Device}";
            return Redirect(url);
        }
    }
}