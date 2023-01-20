using DataSourceSyeew.Repositories.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities
{
    public class AdminRepository : IAdminRepository
    {
        private readonly SyeewContext _context;

        private bool _disposed;

        public AdminRepository(SyeewContext context)
        {
            _context = context;
            _disposed = false;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                    _context.Dispose();
            }
            _disposed = true;
        }

        public async Task<Admin> Add(Admin admin)
        {
            var added = await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return added.Entity;
        }


        public async Task<ICollection<Admin>> GetBy(Func<Admin, ValueTask<bool>> predicate)
        {
            return await _context.Admins.AsAsyncEnumerable().WhereAwait(predicate).ToListAsync();
        }
    }
}
