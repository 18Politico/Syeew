namespace Syeew.Utils.DTOs
{
    public class BoxPlotDataMonthDTO
    {
        public string[] Months { get; set; }

        public double[][] Stats { get; set; }

        public BoxPlotDataMonthDTO(string[] months, double[][] stats)
        {
            this.Months = months;
            this.Stats = stats; 
        }
    }
}
