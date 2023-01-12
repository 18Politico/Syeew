﻿// <auto-generated />
using System;
using DataSourceSyeew;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataSourceSyeew.Migrations
{
    [DbContext(typeof(SyeewContext))]
    partial class SyeewContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DataSourceSyeew.Entities.Company", b =>
                {
                    b.Property<string>("NomeAttivita")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Citta")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DimensioneAddetti")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DimensioneFatturato")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gestionale")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Indirizzo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Provincia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RagioneSociale")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipoAttivita")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NomeAttivita");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("DataSourceSyeew.Entities.QuantitativeData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Cat1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Dim")
                        .HasColumnType("float");

                    b.Property<DateTime>("Dt")
                        .HasColumnType("date");

                    b.Property<double>("FattIvato")
                        .HasColumnType("float");

                    b.Property<int>("IdCat")
                        .HasColumnType("int");

                    b.Property<int>("IdMatrice")
                        .HasColumnType("int");

                    b.Property<string>("IdTipoDiAttivita")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Idx")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Iva")
                        .HasColumnType("float");

                    b.Property<bool>("Lavorato")
                        .HasColumnType("bit");

                    b.Property<string>("MatriceNome")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Netto")
                        .HasColumnType("float");

                    b.Property<double>("Qta")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("MatriceNome");

                    b.ToTable("QuantitativeDatas");
                });

            modelBuilder.Entity("DataSourceSyeew.Entities.QuantitativeData", b =>
                {
                    b.HasOne("DataSourceSyeew.Entities.Company", "Company")
                        .WithMany("Datas")
                        .HasForeignKey("MatriceNome")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("DataSourceSyeew.Entities.Company", b =>
                {
                    b.Navigation("Datas");
                });
#pragma warning restore 612, 618
        }
    }
}
