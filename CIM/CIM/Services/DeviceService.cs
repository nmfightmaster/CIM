using CIM.Data;
using CIM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace CIM.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly CIMContext _context;
        private readonly IMemoryCache _cache;
        public DeviceService(CIMContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }
        public async Task<List<Device>> GetAllAsync()
        {
            var devices = _context.Devices;    
            return await devices.ToListAsync();
        }

        public async Task<List<string>> GetDeviceNamesAsync()
        {
            if (_cache.TryGetValue<List<string>>(
                nameof(GetDeviceNamesAsync), out var deviceNames))
            {
                return deviceNames;
            }
            _cache.Set(nameof(GetDeviceNamesAsync),
                await _context.Devices.Select(d =>
                d.Name.ToLowerInvariant()).ToListAsync());
            return _cache.Get<List<string>>(
                nameof(GetDeviceNamesAsync));
        }

        public async Task<Device> GetByNameAsync(string name)
        {
            return await _context.Devices
                .SingleOrDefaultAsync(d => d.Name == name);
        }
    }
}
