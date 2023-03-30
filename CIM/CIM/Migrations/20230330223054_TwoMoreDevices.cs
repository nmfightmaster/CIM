using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class TwoMoreDevices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "Status",
                value: "Deployable");

            migrationBuilder.InsertData(
                table: "Devices",
                columns: new[] { "Id", "Name", "OU", "PI", "PU", "ServiceTag", "Status" },
                values: new object[,]
                {
                    { 2, "CHASTEST2", "\\chas.local\\CLINIC2\\DEPT2\\", "wifi issues", "Bo 'Bobo' BoBoBo", "5678def", "Needs Imaged" },
                    { 3, "CHASTEST3", "\\chas.local\\CLINIC3\\DEPT3\\", "self esteem issues", "Hugh Mungus", "910ghij", "Deployed" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "Status",
                value: "Inventory");
        }
    }
}
