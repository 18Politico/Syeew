using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface IQuantitativeData
    {
        double IdMatrice { get; set; }

        string MatriceNome { get; set; } //FOREIGN_KEY!!!!!!!!

        string IdTipoDiAttivita { get; set; }

        double IdCat { get; set; }

        string Cat1 { get; set; }

        string Idx { get; set; }

        DateTime Dt { get; set; }

        double Netto { get; set; }

        double Iva { get; set; }

        double FattIvato { get; set; }

        double Qta { get; set; }

        bool Lavorato { get; set; }

        double Dim { get; set; }

        double Id { get; set; }

        //Guid IdCompany { get; set; }

        Company Company { get; set; }
    }
}
