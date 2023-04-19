namespace CIM.Services
{
    public interface ILDAPService
    {
        Task<string> GetOUAsync(string deviceName);
    }
}
