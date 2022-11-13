﻿// <auto-generated />
using System;
using DataSourceSyeew;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataSourceSyeew.Migrations
{
    [DbContext(typeof(SyeewContext))]
    [Migration("20221113225051_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DataSourceSyeew.Entities.QuantitativeData", b =>
                {
                    b.Property<Guid>("IdQuantitativeData")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Cat1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Dim")
                        .HasColumnType("real");

                    b.Property<DateTime>("Dt")
                        .HasColumnType("datetime2");

                    b.Property<double>("FattIvato")
                        .HasColumnType("float");

                    b.Property<int>("IdCat")
                        .HasColumnType("int");

                    b.Property<int>("IdMatrix")
                        .HasColumnType("int");

                    b.Property<string>("Idx")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Iva")
                        .HasColumnType("real");

                    b.Property<string>("MatrixName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Net")
                        .HasColumnType("float");

                    b.Property<float>("Qta")
                        .HasColumnType("real");

                    b.Property<int>("TypeOfCompany")
                        .HasColumnType("int");

                    b.Property<float>("Worked")
                        .HasColumnType("real");

                    b.HasKey("IdQuantitativeData");

                    b.ToTable("QuantitativeDatas");
                });
#pragma warning restore 612, 618
        }
    }
}
