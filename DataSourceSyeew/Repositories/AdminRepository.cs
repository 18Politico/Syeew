using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataSourceSyeew.Repositories
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

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                    _context.Dispose();
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task<Admin> Add(Admin admin)
        {
            var added = await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return added.Entity;
        }

        public async Task<ICollection<Admin>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        public Task<ICollection<Admin>> GetBy(Func<Admin, ValueTask<bool>> predicate)
        {
            throw new NotImplementedException();
        }

    }
}
