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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdCompany { get; set; }
        public string CompanyName { get; set; }
        public string BusinessName { get; set; }
        public TypeOfCompany TypeOfCompany { get; set; }
        public ManegementSystem ManegementSystem { get; set; }
        public Dimention RevenueDimention { get; set; }
        public Dimention EmployeesDimention { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string ProvinceLabel { get; set; }

        public virtual ICollection<QuantitativeData> Datas { get; set; }
    }
}
