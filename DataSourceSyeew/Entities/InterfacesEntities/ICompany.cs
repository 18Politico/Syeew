using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface ICompany
    {
        string RagioneSociale { get; set; }
        string NomeAttività { get; set; }
        string TipoAttività { get; set; }

        ManegementSystem Gestionale { get; set; }
        Dimention DimensioneFatturato { get; set; }
        Dimention DimensioneAddetti { get; set; }

        string Indirizzo { get; set; }
        string Città { get; set; }
        string Provincia { get; set; }

        ICollection<QuantitativeData> Datas { get; set; }
    }
}
