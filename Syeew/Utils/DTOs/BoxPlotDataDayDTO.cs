using Syeew.Utils;

namespace Syeew.DTOs
{
    public class BoxPlotDataDayDTO
    {
        public CustomDate Date { get; set; }

        public double[] Stats { get; set; }

        public BoxPlotDataDayDTO(CustomDate date)
        {
            this.Date = date;
            this.Stats = new double[5];
        }
    }

    

}
