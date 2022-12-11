using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface ICompany
    {
        Guid IdCompany { get; set; }
        string CompanyName { get; set; }
        string BusinessName { get; set; }
        TypeOfCompany TypeOfCompany { get; set; }

        ManegementSystem ManegementSystem { get; set; }
        Dimention RevenueDimention { get; set; }
        Dimention EmployeesDimention { get; set; }

        string Street { get; set; }
        string City { get; set; }
        string ProvinceLabel { get; set; }

        ICollection<QuantitativeData> Datas { get; set; }
    }
}
