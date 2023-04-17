using CIM.Models;
namespace CIM.Services
{
    public interface IDellService
    {
        Task<ApiResponse> GetDataAsync();
    }
}
