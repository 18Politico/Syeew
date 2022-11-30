using DataSourceSyeew.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface IQuantitativeDataRepository : IRepository<QuantitativeData>
    {
        Task<List<QuantitativeData>> GetQuantitativeDatas();

        Task<List<QuantitativeData>> GetBy(Func<QuantitativeData, ValueTask<bool>> predicate);
        Task<QuantitativeData> Add(QuantitativeData quantitativeData);
    }
}
