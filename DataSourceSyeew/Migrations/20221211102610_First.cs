using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataSourceSyeew.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    IdCompany = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOfCompany = table.Column<int>(type: "int", nullable: false),
                    ManegementSystem = table.Column<int>(type: "int", nullable: false),
                    RevenueDimention = table.Column<int>(type: "int", nullable: false),
                    EmployeesDimention = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProvinceLabel = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.IdCompany);
                });

            migrationBuilder.CreateTable(
                name: "QuantitativeDatas",
                columns: table => new
                {
                    IdQuantitativeData = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPointOfSale = table.Column<int>(type: "int", nullable: false),
                    IdCat = table.Column<int>(type: "int", nullable: false),
                    ServiceLabel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Net = table.Column<double>(type: "float", nullable: false),
                    Iva = table.Column<double>(type: "float", nullable: false),
                    RevenueWithIva = table.Column<double>(type: "float", nullable: false),
                    Qty = table.Column<double>(type: "float", nullable: false),
                    Worked = table.Column<bool>(type: "bit", nullable: false),
                    IdCompany = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuantitativeDatas", x => x.IdQuantitativeData);
                    table.ForeignKey(
                        name: "FK_QuantitativeDatas_Companies_IdCompany",
                        column: x => x.IdCompany,
                        principalTable: "Companies",
                        principalColumn: "IdCompany",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuantitativeDatas_IdCompany",
                table: "QuantitativeDatas",
                column: "IdCompany");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuantitativeDatas");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
