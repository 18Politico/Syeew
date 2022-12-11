using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataSourceSyeew.Entities.InterfacesEntities;
using System.Text.Json.Serialization;

namespace DataSourceSyeew.Entities
{
    public class QuantitativeData : IQuantitativeData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdQuantitativeData { get; set; }
        public int IdPointOfSale { get; set; }
        public int IdCat { get; set; }
        public string ServiceLabel { get; set; }
        public DateTime Date { get; set; }
        public double Net { get; set; }
        public double Iva { get; set; }
        public double RevenueWithIva { get; set; }
        public double Qty { get; set; }
        public bool Worked { get; set; }

        //[ForeignKey("IdCompany")]
        public Guid IdCompany { get; set; }

        //[JsonIgnore]
        public virtual Company Company { get; set; }

        public QuantitativeData(int idPointOfSale, string serviceLabel, DateTime date, double net, double iva, double revenueWithIva, double qty, bool worked, Guid idCompany)
        {
            IdPointOfSale = idPointOfSale;
            ServiceLabel = serviceLabel;
            Date = date;
            Net = net;
            Iva = iva;
            RevenueWithIva = revenueWithIva;
            Qty = qty;
            Worked = worked;
            IdCompany = idCompany;
        }
    }
}
