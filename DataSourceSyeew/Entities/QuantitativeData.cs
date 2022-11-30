using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataSourceSyeew.Entities.InterfacesEntities;

namespace DataSourceSyeew.Entities
{
    public class QuantitativeData : IQuantitativeData
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid IdQuantitativeData { get; set; }

        public int IdMatrice { get; set; }
            
        public string MatriceNome { get; set; }
            
        public TypeOfCompany TypeOfCompany { get; set; }

        public int IdCat { get; set; }

        public string Cat1 { get; set; }

        public string Idx { get; set; }


        public DateTime Dt { get; set; }

        public double Net { get; set; }

        public float Iva { get; set; }

        public double FattIvato { get; set; }

        public float Qta { get; set; }  

        public float Lavorato { get; set; }

        public float Dim { get; set; }
    }
}
