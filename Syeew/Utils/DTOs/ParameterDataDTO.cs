namespace Syeew.Utils.DTOs
{
    public class ParameterDataDTO
    {

        public double X { get; set; }

        public double[] Y { get; set; }

        public ParameterDataDTO(double x, double[] y)
        {
            X = x;
            Y = y;
        }
    }
}
