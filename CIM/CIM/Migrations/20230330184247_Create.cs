using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class Create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    ServiceTag = table.Column<string>(type: "TEXT", maxLength: 7, nullable: false),
                    OU = table.Column<string>(type: "TEXT", nullable: true),
                    PU = table.Column<string>(type: "TEXT", nullable: true),
                    PI = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Devices",
                columns: new[] { "Id", "Name", "OU", "PI", "PU", "ServiceTag" },
                values: new object[] { 1, "CHASTEST", "\\chas.local\\CLINIC\\DEPT\\", "monitor issues", "Biggles T. McClure", "1234abc" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Devices");
        }
    }
}
