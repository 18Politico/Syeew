using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface IRepository <R> : IDisposable
    {
        Task<List<R>> GetBy(Func<R, ValueTask<bool>> predicate);
    }
}
