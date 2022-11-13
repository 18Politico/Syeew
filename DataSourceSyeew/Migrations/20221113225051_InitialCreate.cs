using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataSourceSyeew.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuantitativeDatas",
                columns: table => new
                {
                    IdQuantitativeData = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdMatrix = table.Column<int>(type: "int", nullable: false),
                    MatrixName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOfCompany = table.Column<int>(type: "int", nullable: false),
                    IdCat = table.Column<int>(type: "int", nullable: false),
                    Cat1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Idx = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Net = table.Column<double>(type: "float", nullable: false),
                    Iva = table.Column<float>(type: "real", nullable: false),
                    FattIvato = table.Column<double>(type: "float", nullable: false),
                    Qta = table.Column<float>(type: "real", nullable: false),
                    Worked = table.Column<float>(type: "real", nullable: false),
                    Dim = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuantitativeDatas", x => x.IdQuantitativeData);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuantitativeDatas");
        }
    }
}
