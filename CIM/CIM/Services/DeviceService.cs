using CIM.Data;
using CIM.Models;
using Microsoft.EntityFrameworkCore;

namespace CIM.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly CIMContext _context;
        public DeviceService(CIMContext context) => _context = context;
        public async Task<List<Device>> GetAllAsync()
        {
            var devices = _context.Devices
                .Include(c => c.Name)
                .Include(c => c.ServiceTag)
                .Include(c => c.OU)
                .Include(c => c.PU)
                .Include(c => c.PI)
                .Include(c => c.Status);
            return await devices.ToListAsync();
        }
    }
}
