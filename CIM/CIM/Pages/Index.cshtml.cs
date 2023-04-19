using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CIM.Data;
using CIM.Models;
using SQLitePCL;

namespace CIM.Pages
{
    public class IndexModel : PageModel
    {
        private readonly CIM.Data.CIMContext _context;

        public IndexModel(CIM.Data.CIMContext context)
        {
            _context = context;
        }

        public string[] statusTypes = Array.Empty<string>();
        public IList<Device> Device { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Devices != null)
            {
                statusTypes = _context.Devices.Select(x => x.Status).Where(x => x != "Deployed").Distinct().ToArray();
                Device = await _context.Devices.Where(d => !d.IsDeleted && !d.IsDeployed).ToListAsync();
            }
        }
    }
}
