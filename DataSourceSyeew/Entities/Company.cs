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
        public string NomeAttivita { get; set; }
        public string TipoAttivita { get; set; }
        public ManegementSystem Gestionale { get; set; }
        public Dimention DimensioneFatturato { get; set; }
        public Dimention DimensioneAddetti { get; set; }
        public string Indirizzo { get; set; }
        public string Citta { get; set; }
        public string Provincia { get; set; }
        public virtual ICollection<QuantitativeData> Datas { get; set; }

        public Company() { }

        public Company(string ragioneSociale, 
                       string nomeAttivita, 
                       string tipoAttivita, 
                       ManegementSystem gestionale, 
                       Dimention dimensioneFatturato, 
                       Dimention dimensioneAddetti, 
                       string indirizzo, 
                       string citta, 
                       string provincia)
        {
            RagioneSociale = ragioneSociale;
            NomeAttivita = nomeAttivita;
            TipoAttivita = tipoAttivita;
            Gestionale = gestionale;
            DimensioneFatturato = dimensioneFatturato;
            DimensioneAddetti = dimensioneAddetti;
            Indirizzo = indirizzo;
            Citta = citta;
            Provincia = provincia;
        }
    }
}
