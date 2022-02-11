using Microsoft.EntityFrameworkCore;
using VacationSystem.Data;

namespace VacationSystem.Models
{
    public static class Seed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new VacationSystemDbContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<VacationSystemDbContext>>()))
            {
                // Look for any employees.
                if (context.Employees.Any() && context.OfficialVacations.Any())
                {
                    return;   // DB has been seeded
                }
                if (!context.Employees.Any())
                {
                    DateTime hiringDate = new DateTime(2021, 01, 21);

                    context.Employees.Add(
                        new Employee
                        {
                            Name = "Amir Latif",
                            JobTitle = "Software Engineer",
                            HiringDate = hiringDate,
                            Image = "amir-latif.jpg",
                            DateOfBirth = new DateTime(1992, 08, 07),
                            Mobile = 1245326354,
                            Email = "amir.j.latif@outlook.com",
                            Address = "Egypt",
                        }
                    );
                    context.SaveChanges();

                }

                if (!context.OfficialVacations.Any())
                {
                    context.OfficialVacations.AddRange(
                        new OfficialVacation
                        {
                            Name = "6<sup>th</sup> of October",
                            Date = new DateTime(1973, 10, 06)
                        },
                         new OfficialVacation
                         {
                             Name = "Sinai Liberation",
                             Date = new DateTime(1982, 04, 25)
                         }
                    );

                    context.SaveChanges();
                }

                if (!context.DaysUsed.Any())
                {
                    context.DaysUsed.AddRange(
                        new DayUsed
                        {
                            EmployeeId = 1,
                            Date = new DateTime(1973, 10, 06)
                        },
                         new DayUsed
                         {
                             EmployeeId = 1,
                             Date = new DateTime(1982, 04, 25)
                         }
                    );

                    context.SaveChanges();
                }
            }
        }
    }
}