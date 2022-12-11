using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
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

        public async Task<ICollection<QuantitativeData>> GetQuantitativeDatas()
        {
            return await _context.QuantitativeDatas.Include(qD => qD.Company).ToListAsync();
        }

        public async Task<ICollection<QuantitativeData>> GetBy(Func<QuantitativeData, ValueTask<bool>> predicate)
        {
            return await _context.QuantitativeDatas.Include(qD => qD.Company).AsAsyncEnumerable().WhereAwait(predicate).ToListAsync();
        }

        public async Task<QuantitativeData> Add(QuantitativeData qD)
        {
            var data = new QuantitativeData(qD.IdPointOfSale,
                                            qD.ServiceLabel,
                                            qD.Date,
                                            qD.Net,
                                            qD.Iva,
                                            qD.RevenueWithIva,
                                            qD.Qty,
                                            qD.Worked, 
                                            qD.IdCompany);

            var added = await _context.QuantitativeDatas.AddAsync(data);
            await _context.SaveChangesAsync();
            return added.Entity;
        }

        
    }

    
}
