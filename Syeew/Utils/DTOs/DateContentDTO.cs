namespace Syeew.Utils.DTOs
{
    public class DateContentDTO
    {

        public CustomDate date { get; set; }

        public double Content { get; set; }

        public DateContentDTO(CustomDate date, double content)
        {
            this.date = date;
            Content = content;
        }
    }
}
