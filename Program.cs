using Microsoft.EntityFrameworkCore;
using VacationSystem.Data;
using VacationSystem.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;
services.AddControllers();
services.AddEndpointsApiExplorer();

// Add DB Context
if (builder.Environment.IsDevelopment())
{
    services.AddDbContext<VacationSystemDbContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DevelopmentVacationSystemContext")));
}
else
{
    services.AddDbContext<VacationSystemDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductionVacationContext")));
}

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//Seed intializer
if (builder.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    Seed.Initialize(scope.ServiceProvider);
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
