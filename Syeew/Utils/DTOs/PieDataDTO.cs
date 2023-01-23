namespace Syeew.Utils.DTOs
{
    public class PieDataDTO
    {
        public string Label { get; set; }

        public double ContentData { get; set; }

        public PieDataDTO(string label, double contentData)
        {
            Label = label;
            ContentData = contentData;
        }
    }
}
