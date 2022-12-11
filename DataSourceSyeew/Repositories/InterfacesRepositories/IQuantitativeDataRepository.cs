using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface IQuantitativeDataRepository: IRepository<QuantitativeData>
    {
        Task<ICollection<QuantitativeData>> GetQuantitativeDatas();

        Task<ICollection<QuantitativeData>> GetBy(Func<QuantitativeData, ValueTask<bool>> predicate);
        Task<QuantitativeData> Add(QuantitativeData quantitativeData);
    }
}
