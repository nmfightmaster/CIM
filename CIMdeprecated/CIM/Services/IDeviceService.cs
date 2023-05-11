using CIM.Models;
namespace CIM.Services
{
    public interface IDeviceService
    {
        Task<List<Device>> GetAllAsync();
        Task<List<string>> GetDeviceNamesAsync();
        Task<Device> GetByNameAsync(string name);
        Task<Device> CreateAsync(Device device);
        Task<Device> EditAsync(Device device);
    }
}
