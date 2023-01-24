using DataSourceSyeew.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories.InterfacesRepositories
{
    public interface IAdminRepository : IRepository<Admin>
    {   
        Task<ICollection<Admin>> GetAdmins();
        Task<Admin> Add(Admin admin);
    }
}
