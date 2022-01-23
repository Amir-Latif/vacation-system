namespace VacationSystem.Models
{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string JobTitle { get; set; }
        public DateTime HiringDate { get; set; }
        public string Image { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int TotalCredit
        {
            get { return new DateTime().Subtract(HiringDate).TotalDays > 3650 ? 30 : 21; }
        }
        public int UsedCredit { get; set; } = 0;

        public ICollection<VacationRequest> VacationRequests { get; set; }
    }

    public class OfficialVacation
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
    }

    public class DayUsed
    {
        public int ID { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public DateTime Date { get; set; }
    }

    public class VacationRequest
    {
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string VacationType { get; set; }
        public string Reason { get; set; }
    }
}
