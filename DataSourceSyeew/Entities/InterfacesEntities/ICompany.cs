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
        string NomeAttivita { get; set; }
        string TipoAttivita { get; set; }

        string Gestionale { get; set; }
        string DimensioneFatturato { get; set; }
        string DimensioneAddetti { get; set; }

        string Indirizzo { get; set; }
        string Citta { get; set; }
        string Provincia { get; set; }

        ICollection<QuantitativeData> Datas { get; set; }
    }
}
