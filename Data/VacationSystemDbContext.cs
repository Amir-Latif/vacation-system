using Microsoft.EntityFrameworkCore;
using VacationSystem.Models;

namespace VacationSystem.Data
{
    public class VacationSystemDbContext : DbContext
    {
        public VacationSystemDbContext(DbContextOptions<VacationSystemDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<OfficialVacation> OfficialVacations { get; set; }
        public DbSet<DayUsed> DaysUsed { get; set; }
        public DbSet<VacationRequest> VacationRequests { get; set; }
    }
}