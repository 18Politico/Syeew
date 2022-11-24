using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataSourceSyeew.Repositories
{
    public class QuantitativeDataRepository : IQuantitativeDataRepository, IDisposable
    {

        private readonly SyeewContext _context;

        private bool _disposed;

        public QuantitativeDataRepository(SyeewContext context)
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

        public async Task<List<QuantitativeData>> GetQuantitativeDatas()
        {
            return await _context.QuantitativeDatas.ToListAsync();
        }

        public async Task<List<QuantitativeData>> GetBy(Func<QuantitativeData, ValueTask<bool>> predicate)
        {
            return await _context.QuantitativeDatas.AsAsyncEnumerable().WhereAwait(predicate).ToListAsync();
        }
    }

    
}
