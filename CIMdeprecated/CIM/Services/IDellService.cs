using CIM.Models;
namespace CIM.Services
{
    public interface IDellService
    {
        Task<string> GetDataAsync();
        Device Device { get; set;}
    }
}
