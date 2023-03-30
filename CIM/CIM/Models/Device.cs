using Microsoft.Extensions.ObjectPool;

namespace CIM.Models
{
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ServiceTag { get; set; }
        public string? OU { get; set; }
        public string? PU { get; set; }

        public string[]? Issues { get; set; }
    }
}
