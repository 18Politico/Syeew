using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface IQuantitativeData
    {
        Guid IdQuantitativeData { get; set; }

        int  IdPointOfSale { get; set; }

        //public string MatriceNome { get; set; } FOREIGN_KEY!!!!!!!!

        //public TypeOfCompany TypeOfCompany { get; set; }

        int IdCat { get; set; }

        string ServiceLabel { get; set; }

        //public string Idx { get; set; }

        DateTime Date { get; set; }

        double Net { get; set; }

        double Iva { get; set; }

        double RevenueWithIva { get; set; }

        double Qty { get; set; }

        bool Worked { get; set; }

        //public float Dim { get; set; }

        Guid IdCompany { get; set; }

        Company Company { get; set; }
    }
}
