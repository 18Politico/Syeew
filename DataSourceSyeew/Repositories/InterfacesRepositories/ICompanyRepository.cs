using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface ICompanyRepository: IRepository<Company>
    {
        Task<ICollection<Company>> GetCompanies();

        Task<ICollection<Company>> GetBy(Func<Company, ValueTask<bool>> predicate);
        Task<Company> Add(Company company);
    }
}
