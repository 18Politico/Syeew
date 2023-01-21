namespace Syeew.Utils.DTOs
{
    public class TemporalDataDTO
    {

        public CustomDate date { get; set; }

        public double Content { get; set; }

        public TemporalDataDTO(CustomDate date, double content)
        {
            this.date = date;
            Content = content;
        }
    }
}
