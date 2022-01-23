namespace VacationSystem.Models
{
    [Serializable]
    public class RequestByID
    {
        public int Id { get; set; }
    }

    [Serializable]
    public class PostVacationRequest
    {
        public int EmployeeId { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string VacationType { get; set; }
        public string Reason { get; set; }
    }  
}
