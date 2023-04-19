using CIM.Models;
using System.DirectoryServices;
using System.Text.RegularExpressions;

namespace CIM.Services
{
    public class LDAPService : ILDAPService
    {
        private readonly IConfiguration _configuration;
        private readonly string _ldapPath;
        private readonly string _ldapUsername;
        private readonly string _ldapPassword;

        public LDAPService (IConfiguration configuration)
        {
            _configuration = configuration;
            _ldapPath = configuration["LDAP:Path"];
            _ldapUsername = configuration["LDAP:Username"];
            _ldapPassword = configuration["LDAP:Password"];
        }
        public async Task<string> GetOUAsync(string deviceName)
        {
            using (DirectoryEntry directoryEntry = new DirectoryEntry(_ldapPath, _ldapUsername, _ldapPassword))
            {
                using (DirectorySearcher ldapSearch = new DirectorySearcher(directoryEntry))
                {
                    ldapSearch.Filter = $"(&(objectClass=computer)(cn={deviceName}))";
                    ldapSearch.SearchScope = SearchScope.Subtree;
                    SearchResult searchResult = ldapSearch.FindOne();
                    if (searchResult != null)
                    {
                        string path = searchResult.Path.Substring(7); // remove "LDAP://"
                        string[] pathComponents = Regex.Split(path, ",(?=(?:[^\\\"]*\\\"[^\\\"]*\\\")*[^\\\"]*$)"); // split path by commas, ignoring commas within quotes
                        string formattedPath = $"{pathComponents[pathComponents.Length - 2].Substring(3)}/{pathComponents[pathComponents.Length - 3].Substring(3)}"; // add domain and top-level OU
                        for (int i = pathComponents.Length - 4; i >= 1; i--)
                        {
                            formattedPath += $"/{pathComponents[i].Substring(3)}"; // add nested OUs
                        }
                        return formattedPath;
                    } else {
                        string formattedPath = "Device not found in AD.";
                        return formattedPath;
                    }
                }
            }
        }
    }
}
