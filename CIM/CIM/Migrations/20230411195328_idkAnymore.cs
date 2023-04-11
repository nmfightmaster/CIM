using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class idkAnymore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6,
                column: "IssueDate",
                value: "04/11/2023 12:53:28");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 1,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 2,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 3,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 4,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 5,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");

            migrationBuilder.UpdateData(
                table: "PreviousIssues",
                keyColumn: "Id",
                keyValue: 6,
                column: "IssueDate",
                value: "04/10/2023 15:44:09");
        }
    }
}
