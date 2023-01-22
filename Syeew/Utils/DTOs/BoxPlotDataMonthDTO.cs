namespace Syeew.Utils.DTOs
{
    public class BoxPlotDataMonthDTO
    {
        public string[] Months { get; set; }

        public List<double[]> Stats { get; set; }

        public BoxPlotDataMonthDTO(string[] months, List<double[]> stats)
        {
            this.Months = months;
            this.Stats = stats; 
        }
    }
}
