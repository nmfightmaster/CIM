using CIM.Models;
namespace CIM.Services
{
    public interface IDeviceService
    {
        Task<List<Device>> GetAllAsync();
        Task<List<string>> GetDeviceNamesAsync();
        Task<Device> GetByNameAsync(string name);
    }
}
