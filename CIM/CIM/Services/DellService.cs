using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using CIM.Models;

namespace CIM.Services
{
    public class DellService : IDellService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly string _baseUrl;
        private readonly string _authTokenCacheKey;
        private readonly string _authTokenEndpoint;

        public DellService(HttpClient httpClient, IMemoryCache cache, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _cache = cache;
            _baseUrl = configuration["ExternalApi:BaseUrl"];
            _authTokenCacheKey = "ExternalApi_AuthToken";
            _authTokenEndpoint = configuration["ExternalApi:AuthorizationTokenEndpoint"];
        }

        public async Task<ApiResponse> GetDataAsync()
        {
            var authorizationToken = await GetAuthorizationTokenAsync();
            var request = new HttpRequestMessage(HttpMethod.Get, $"{_baseUrl}/data");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authorizationToken);
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ApiResponse>(content);
        }

        private async Task<string> GetAuthorizationTokenAsync()
        {
            if (_cache.TryGetValue(_authTokenCacheKey, out string authorizationToken))
            {
                return authorizationToken;
            }

            var request = new HttpRequestMessage(HttpMethod.Post, _authTokenEndpoint);
            // Set up the request body, headers, etc.
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            //authorizationToken = JsonConvert.DeserializeObject<ApiResponse>(content).AuthToken;

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(3600));
            _cache.Set(_authTokenCacheKey, authorizationToken, cacheOptions);

            return authorizationToken;
        }

    }
}
