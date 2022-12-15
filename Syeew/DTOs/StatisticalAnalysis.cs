namespace Syeew.DTOs
{
    public class StatisticalAnalysis
    {
        public string CompanyName { get; set; }

        //public DateTime Date { get; set; }

        public int Day { get; set; }
        public int Mouth { get; set; }
        public int Year { get; set; }
        public double Value { get; set; }

        //public StatisticalAnalysis(string companyName, DateTime date, double value)
        //{
        //    CompanyName = companyName;
        //    Date = date;
        //    Value = value;
        //}

        public StatisticalAnalysis(string companyName, int day, int mouth, int year, double value)
        {
            CompanyName = companyName;
            Day = day;
            Mouth = mouth;
            Year = year;
            Value = value;
        }
    }
}
