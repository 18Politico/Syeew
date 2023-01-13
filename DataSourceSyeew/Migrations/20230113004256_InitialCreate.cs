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
                name: "Companies",
                columns: table => new
                {
                    NomeAttivita = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RagioneSociale = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TipoAttivita = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gestionale = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DimensioneFatturato = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DimensioneAddetti = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Indirizzo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Citta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Provincia = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.NomeAttivita);
                });

            migrationBuilder.CreateTable(
                name: "QuantitativeDatas",
                columns: table => new
                {
                    Id = table.Column<double>(type: "float", nullable: false),
                    IdMatrice = table.Column<double>(type: "float", nullable: true),
                    MatriceNome = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdTipoDiAttivita = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCat = table.Column<double>(type: "float", nullable: true),
                    Cat1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Idx = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dt = table.Column<DateTime>(type: "date", nullable: false),
                    Netto = table.Column<double>(type: "float", nullable: false),
                    Iva = table.Column<double>(type: "float", nullable: true),
                    FattIvato = table.Column<double>(type: "float", nullable: false),
                    Qta = table.Column<double>(type: "float", nullable: false),
                    Lavorato = table.Column<bool>(type: "bit", nullable: true),
                    Dim = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuantitativeDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuantitativeDatas_Companies_MatriceNome",
                        column: x => x.MatriceNome,
                        principalTable: "Companies",
                        principalColumn: "NomeAttivita",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuantitativeDatas_MatriceNome",
                table: "QuantitativeDatas",
                column: "MatriceNome");
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
