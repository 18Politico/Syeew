using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {

        private readonly SyeewContext _context;

        private bool _disposed;

        public CompanyRepository(SyeewContext context)
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

        public async Task<Company> Add(Company company)
        {
            var added = await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
            return added.Entity;
        }

        public async Task<ICollection<Company>> GetBy(Func<Company, ValueTask<bool>> predicate)
        {
            return await _context.Companies.AsAsyncEnumerable().WhereAwait(predicate).ToListAsync();
        }


        public async Task<ICollection<Company>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }
    }
}
