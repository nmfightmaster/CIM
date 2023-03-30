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
            var devices = _context.Devices;    
            return await devices.ToListAsync();
        }
    }
}
