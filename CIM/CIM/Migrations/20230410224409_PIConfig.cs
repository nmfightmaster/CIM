using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class PIConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PreviousIssues",
                columns: new[] { "Id", "DeviceId", "IssueDate", "IssueDetails", "IssueType", "Technician" },
                values: new object[,]
                {
                    { 1, 1, "04/10/2023 15:44:09", "Screen Cracked", "Hardware", "Bobo" },
                    { 2, 1, "04/11/2023 15:44:09", "Blue Screen", "Software", "Bobo" },
                    { 3, 2, "04/12/2023 15:44:09", "Screen Cracked2", "Hardware", "Bibi" },
                    { 4, 2, "04/13/2023 15:44:09", "Blue Screen2", "Software", "Bibi" },
                    { 5, 3, "04/14/2023 15:44:09", "Screen Cracked3", "Hardware", "Baba" },
                    { 6, 3, "04/15/2023 15:44:09", "Blue Screen3", "Software", "Baba" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
