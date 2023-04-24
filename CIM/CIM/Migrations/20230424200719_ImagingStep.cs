using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class ImagingStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImagingStep",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImagingStep",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImagingStep",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImagingStep",
                value: 4);

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1,
                column: "IssueDate",
                value: "04/24/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2,
                column: "IssueDate",
                value: "04/24/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3,
                column: "IssueDate",
                value: "04/24/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4,
                column: "IssueDate",
                value: "04/24/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5,
                column: "IssueDate",
                value: "04/24/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6,
                column: "IssueDate",
                value: "04/24/2023");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagingStep",
                table: "Devices");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1,
                column: "IssueDate",
                value: "04/18/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2,
                column: "IssueDate",
                value: "04/18/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3,
                column: "IssueDate",
                value: "04/18/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4,
                column: "IssueDate",
                value: "04/18/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5,
                column: "IssueDate",
                value: "04/18/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6,
                column: "IssueDate",
                value: "04/18/2023");
        }
    }
}
