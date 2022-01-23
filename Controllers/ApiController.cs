using Microsoft.AspNetCore.Mvc;
using VacationSystem.Data;
using VacationSystem.Models;

namespace VacationSystem.Controllers
{
    [ApiController]
    [Route("Api")]
    public class ApiController : ControllerBase
    {
        private readonly VacationSystemDbContext _context;

        public ApiController(VacationSystemDbContext context)
        {
            _context = context;
        }

        [HttpPost("getProfile")]
        public ActionResult<Employee> ConfirmLogin(RequestByID request)
        {
            Employee employee = _context.Employees.Where(e => request.Id == e.ID).First();

            return Ok(employee);
        }


        [HttpPost("postVacationRequest")]
        public async Task<ActionResult> PostVacationRequest(PostVacationRequest request)
        {
            //Register taken days in DaysUsed Table
            int usedDays = 0;
            int uncountedDays = 0;
            for (DateTime date = request.From; date <= request.To; date = date.AddDays(1))
            {
                if (!_context.DaysUsed.Select(e => e.Date).ToList().Contains(date))
                {
                    _context.DaysUsed.Add(
                        new DayUsed
                        {
                            EmployeeId = request.EmployeeId,
                            Date = date
                        });
                    usedDays += 1;
                }
                else { uncountedDays += 1; }
            }

            //Register the vacation request
            if (usedDays > 0)
            {
                _context.VacationRequests.Add(new VacationRequest
                {
                    EmployeeID = request.EmployeeId,
                    From = request.From,
                    To = request.To,
                    VacationType = request.VacationType,
                    Reason = request.Reason
                });
            }

            //Update the UsedDays value for the employee
            Employee employee = _context.Employees.Where(e => e.ID == request.EmployeeId).First();
            employee.UsedCredit += usedDays;

            await _context.SaveChangesAsync();

            return Ok(
                    new Dictionary<string, int>
                    {
                        { "daysUsed", employee.UsedCredit },
                        { "uncountedDays", uncountedDays }
                    });
        }


        [HttpPost("getHolidays")]
        public ActionResult<OfficialVacation> GetHolidays()
        {
            var holidays = _context.OfficialVacations.Select(e => e.Date).ToList();
            List<string> returnedHolidays = new();
            foreach (var holiday in holidays)
            {
                returnedHolidays.Add(holiday.ToString("yyyy-MM-dd").Substring(5, 5));
            }

            return Ok(returnedHolidays);
        }


        [HttpPost("getHistory")]
        public ActionResult GetRequestHistory(RequestByID request)
        {
            return Ok(_context.VacationRequests.Where(e => e.EmployeeID == request.Id).ToList());
        }
    };
}