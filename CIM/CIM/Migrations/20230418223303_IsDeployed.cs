using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class IsDeployed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeployed",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDeployed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsDeployed",
                value: false);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsDeployed",
                value: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeployed",
                table: "Devices");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1,
                column: "IssueDate",
                value: "04/17/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2,
                column: "IssueDate",
                value: "04/17/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3,
                column: "IssueDate",
                value: "04/17/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4,
                column: "IssueDate",
                value: "04/17/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5,
                column: "IssueDate",
                value: "04/17/2023");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6,
                column: "IssueDate",
                value: "04/17/2023");
        }
    }
}
