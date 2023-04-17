using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class idkmaybenew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PreviousIssues_Devices_DeviceId",
                table: "PreviousIssues");

            migrationBuilder.AlterColumn<string>(
                name: "Technician",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "IssueType",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "IssueDetails",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "IssueDate",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "PreviousIssues",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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

            migrationBuilder.AddForeignKey(
                name: "FK_PreviousIssues_Devices_DeviceId",
                table: "PreviousIssues",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PreviousIssues_Devices_DeviceId",
                table: "PreviousIssues");

            migrationBuilder.AlterColumn<string>(
                name: "Technician",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IssueType",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IssueDetails",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IssueDate",
                table: "PreviousIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "PreviousIssues",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_PreviousIssues_Devices_DeviceId",
                table: "PreviousIssues",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
