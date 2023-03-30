using CIM.Models;
namespace CIM.Services
{
    public interface IDeviceService
    {
        Task<List<Device>> GetAllAsync();
    }
}
