using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataSourceSyeew.Entities.InterfacesEntities;
using System.Text.Json.Serialization;

namespace DataSourceSyeew.Entities
{
    public class QuantitativeData : IQuantitativeData
    {
        public double IdMatrice { get; set; }

        [ForeignKey("NomeAttivita")]
        public string MatriceNome { get; set; }
        public string IdTipoDiAttivita { get; set; }
        public double IdCat { get; set; }
        public string Cat1 { get; set; }
        public string Idx { get; set; }
        public DateTime Dt { get; set; }
        public double Netto { get; set; }
        public double Iva { get; set; }
        public double FattIvato { get; set; }
        public double Qta { get; set; }
        public bool Lavorato { get; set; }
        public double Dim { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public double Id { get; set; }

        //public Guid IdCompany { get; set; }
        virtual public Company Company { get; set; }

        QuantitativeData() { }
        public QuantitativeData(double idMatrice, 
                                string matriceNome, 
                                string idTipoDiAttività, 
                                double idCat, 
                                string cat1, 
                                string idx, 
                                DateTime dt, 
                                double netto, 
                                double iva, 
                                double fattIvato, 
                                double qta, 
                                bool lavorato, 
                                double dim, 
                                double id)
        {
            IdMatrice = idMatrice;
            MatriceNome = matriceNome;
            IdTipoDiAttivita = idTipoDiAttività;
            IdCat = idCat;
            Cat1 = cat1;
            Idx = idx;
            Dt = dt;
            Netto = netto;
            Iva = iva;
            FattIvato = fattIvato;
            Qta = qta;
            Lavorato = lavorato;
            Dim = dim;
            Id = id;
        }

        public QuantitativeData(double idMatrice, 
                                string matriceNome, 
                                string idTipoDiAttività, 
                                double idCat, 
                                string cat1, 
                                string idx, 
                                DateTime dt, 
                                double netto, 
                                double iva, 
                                double fattIvato, 
                                double qta, 
                                bool lavorato, 
                                double dim)
        {
            IdMatrice = idMatrice;
            MatriceNome = matriceNome;
            IdTipoDiAttivita = idTipoDiAttività;
            IdCat = idCat;
            Cat1 = cat1;
            Idx = idx;
            Dt = dt;
            Netto = netto;
            Iva = iva;
            FattIvato = fattIvato;
            Qta = qta;
            Lavorato = lavorato;
            Dim = dim;
        }
    }
}
