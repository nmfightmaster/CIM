using Microsoft.EntityFrameworkCore;
namespace CIM.Data
{
    public class CIMContext : DbContext
    {
        public CIMContext(DbContextOptions options) : base(options) 
        {
        
        }
    }
}
