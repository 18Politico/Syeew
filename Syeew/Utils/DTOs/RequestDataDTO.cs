namespace Syeew.Utils.DTOs
{
    public class RequestDataDTO
    {
        public string CompanyName { get; set; }
        public CustomDate From { get; set; }

        public CustomDate To { get; set; }

        public string ContentX { get; set; }

        public string ContentY { get; set; }
    }
}
