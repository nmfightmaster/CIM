using CIM.Data;
using CIM.Services;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDbContext<CIMContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString
        ("CIMContext"));
});
builder.Services.AddScoped<IDeviceService, DeviceService>()
    .AddScoped<IPIService, PIService>()
    .AddScoped<IDellService, DellService>()
    .AddScoped<ILDAPService, LDAPService>();

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

var baseAddress = Environment.GetEnvironmentVariable("ExternalApi: BaseUrl");
builder.Services.AddHttpClient("Dell", s =>
{
    s.BaseAddress = new Uri(baseAddress);
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Start();

if (!app.Environment.IsDevelopment())
{
    Process.Start("cmd", "/C start http://localhost:5000");
}

app.WaitForShutdown();