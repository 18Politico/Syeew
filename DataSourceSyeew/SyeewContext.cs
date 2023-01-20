using DataSourceSyeew.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DataSourceSyeew
{
    public class SyeewContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<QuantitativeData> QuantitativeDatas { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public SyeewContext() { }
        public SyeewContext(DbContextOptions<SyeewContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .HasMany<QuantitativeData>(c => c.Datas)
                .WithOne(qD => qD.Company)
                .HasForeignKey(qD => qD.MatriceNome);

            //modelBuilder.Entity<Company>()
            //    .Property(c => c.Gestionale)
            //    .HasConversion(new EnumToStringConverter<ManegementSystem>());

            //modelBuilder.Entity<Company>()
            //    .Property(c => c.DimensioneAddetti)
            //    .HasConversion(new EnumToStringConverter<Dimention>());

            //modelBuilder.Entity<Company>()
            //    .Property(c => c.DimensioneFatturato)
            //    .HasConversion(new EnumToStringConverter<Dimention>());


            modelBuilder.Entity<QuantitativeData>()
                .Property(qD => qD.Dt)
                .HasColumnType("date");

            //modelBuilder.Entity<QuantitativeData>()
            //    .Property(qD => qD.IdTipoDiAttivita)
            //    .HasConversion(new EnumToStringConverter<TypeOfCompany>());



            //modelBuilder.Entity<QuantitativeData>()
            //    .HasOne<Company>(qD => qD.Company)
            //    .WithMany(c => c.Datas)
            //    .HasForeignKey(c => c.IdCompany);

        }
    }
}
