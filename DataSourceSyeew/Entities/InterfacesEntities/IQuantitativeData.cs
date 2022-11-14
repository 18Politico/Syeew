using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface IQuantitativeData
    {
        public Guid IdQuantitativeData { get; set; }

        public int IdMatrix { get; set; }

        public string MatrixName { get; set; }

        public TypeOfCompany TypeOfCompany { get; set; }

        public int IdCat { get; set; }

        public string Cat1 { get; set; }

        public string Idx { get; set; }


        public DateTime Dt { get; set; }

        public double Net { get; set; }

        public float Iva { get; set; }

        public double FattIvato { get; set; }

        public float Qta { get; set; }

        public float Worked { get; set; }

        public float Dim { get; set; }
    }
}
