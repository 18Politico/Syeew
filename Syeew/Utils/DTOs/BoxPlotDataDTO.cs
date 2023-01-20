using Syeew.Utils;

namespace Syeew.DTOs
{
    public class BoxPlotDataDTO
    {
        //public DateTime Date { get; set; }

        public CustomDate Date { get; set; }

        public double[] Stats { get; set; }

        public BoxPlotDataDTO(CustomDate date)
        {
            this.Date = date;
            this.Stats = new double[5];
        }
    }

    

}
