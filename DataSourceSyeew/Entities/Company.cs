using DataSourceSyeew.Entities.InterfacesEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace DataSourceSyeew.Entities
{
    public class Company : ICompany
    {
        
        public string RagioneSociale { get; set; }

        [Key]
        public string NomeAttività { get; set; }
        public string TipoAttività { get; set; }
        public ManegementSystem Gestionale { get; set; }
        public Dimention DimensioneFatturato { get; set; }
        public Dimention DimensioneAddetti { get; set; }
        public string Indirizzo { get; set; }
        public string Città { get; set; }
        public string Provincia { get; set; }
        public virtual ICollection<QuantitativeData> Datas { get; set; }

        public Company(string ragioneSociale, 
                       string nomeAttività, 
                       string tipoAttività, 
                       ManegementSystem gestionale, 
                       Dimention dimensioneFatturato, 
                       Dimention dimensioneAddetti, 
                       string indirizzo, 
                       string città, 
                       string provincia)
        {
            RagioneSociale = ragioneSociale;
            NomeAttività = nomeAttività;
            TipoAttività = tipoAttività;
            Gestionale = gestionale;
            DimensioneFatturato = dimensioneFatturato;
            DimensioneAddetti = dimensioneAddetti;
            Indirizzo = indirizzo;
            Città = città;
            Provincia = provincia;
        }
    }
}
