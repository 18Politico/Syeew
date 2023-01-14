using DataSourceSyeew.Entities.InterfacesEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Diagnostics.CodeAnalysis;

namespace DataSourceSyeew.Entities
{
    public class Company : ICompany
    {
        
        public string RagioneSociale { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string NomeAttivita { get; set; }
        public string? TipoAttivita { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ManegementSystem? Gestionale { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Dimention? DimensioneFatturato { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Dimention? DimensioneAddetti { get; set; }
        public string? Indirizzo { get; set; }
        public string? Citta { get; set; }
        public string? Provincia { get; set; }
        public virtual ICollection<QuantitativeData> Datas { get; set; }

        public Company() { }

        public Company(string ragioneSociale, 
                       string nomeAttivita, 
                       string? tipoAttivita, 
                       ManegementSystem? gestionale, 
                       Dimention? dimensioneFatturato, 
                       Dimention? dimensioneAddetti, 
                       string? indirizzo, 
                       string? citta, 
                       string? provincia)
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
