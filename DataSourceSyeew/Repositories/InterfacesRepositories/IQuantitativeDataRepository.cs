using DataSourceSyeew.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface IQuantitativeDataRepository : IDisposable
    {
        Task<List<QuantitativeData>> GetQuantitativeDatas();
    }
}
