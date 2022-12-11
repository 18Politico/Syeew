using DataSourceSyeew.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew
{
    public class SyeewContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<QuantitativeData> QuantitativeDatas { get; set; }

        public SyeewContext() { }
        public SyeewContext(DbContextOptions<SyeewContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .HasMany<QuantitativeData>(c => c.Datas)
                .WithOne(qD => qD.Company)
                .HasForeignKey(qD => qD.IdCompany);

            //modelBuilder.Entity<QuantitativeData>()
            //    .HasOne<Company>(qD => qD.Company)
            //    .WithMany(c => c.Datas)
            //    .HasForeignKey(c => c.IdCompany);

        }
    }
}
