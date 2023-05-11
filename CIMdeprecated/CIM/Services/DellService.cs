using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using CIM.Models;
using Newtonsoft.Json.Linq;

namespace CIM.Services
{
    public class DellService : IDellService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly string _baseUrl;
        private readonly string _authTokenCacheKey;
        private readonly string _authTokenEndpoint;
        private readonly IConfiguration _configuration;
        public Device Device { get; set; }

        public DellService(HttpClient httpClient, IMemoryCache cache, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _cache = cache;
            _baseUrl = configuration["ExternalApi:BaseUrl"];
            _authTokenCacheKey = "ExternalApi_AuthToken";
            _authTokenEndpoint = configuration["ExternalApi:AuthTokenEndpoint"];
            _configuration = configuration;
        }

        public async Task<string> GetDataAsync()
        {
            try
            {
                var authorizationToken = await GetAuthorizationTokenAsync();
                var request = new HttpRequestMessage(HttpMethod.Get, $"{_baseUrl}/asset-entitlements?servicetags={Device.ServiceTag}");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authorizationToken);
                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                JArray responseJson = JArray.Parse(content);
                DateTime maxEndDate = DateTime.MinValue;
                foreach (JObject entitlement in responseJson[0]["entitlements"])
                {
                    DateTime endDate = DateTime.Parse(entitlement["endDate"].ToString());
                    if (endDate > maxEndDate)
                    {
                        maxEndDate = endDate;
                    }
                }
                string furthestEndDate = maxEndDate.ToString("MMMM dd yyyy");
                return furthestEndDate;
            }
            catch (Exception ex)
            {
                return "Dell Service API not available--server environment variables are unavailable during testing.";
            }



        }

        private async Task<string> GetAuthorizationTokenAsync()
        {
            if (_cache.TryGetValue(_authTokenCacheKey, out string authorizationToken))
            {
                return authorizationToken;
            }

            string grant_type = "client_credentials";
            string client_id = _configuration["ExternalApi:Client_ID"];
            string client_secret = _configuration["ExternalApi:Client_Secret"];
            var form = new Dictionary<string, string>
                {
                    {"grant_type", grant_type},
                    {"client_id", client_id},
                    {"client_secret", client_secret}
                };

            var request = new HttpRequestMessage(HttpMethod.Post, _authTokenEndpoint)
            {
                Content = new FormUrlEncodedContent(form)
            };
            request.Headers.Add("Accept", "application/json");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            JObject responseJson = JObject.Parse(content);
            authorizationToken = responseJson["access_token"].ToString();

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(3600));
            _cache.Set(_authTokenCacheKey, authorizationToken, cacheOptions);

            return authorizationToken;
        }

    }
}
