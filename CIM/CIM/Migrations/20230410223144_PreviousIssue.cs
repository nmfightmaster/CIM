using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class PreviousIssue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PI",
                table: "Devices");

            migrationBuilder.CreateTable(
                name: "PreviousIssues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IssueType = table.Column<string>(type: "TEXT", nullable: false),
                    IssueDetails = table.Column<string>(type: "TEXT", nullable: false),
                    Technician = table.Column<string>(type: "TEXT", nullable: false),
                    IssueDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeviceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreviousIssues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PreviousIssues_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PreviousIssues_DeviceId",
                table: "PreviousIssues",
                column: "DeviceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PreviousIssues");

            migrationBuilder.AddColumn<string>(
                name: "PI",
                table: "Devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "PI",
                value: "monitor issues");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                column: "PI",
                value: "wifi issues");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                column: "PI",
                value: "self esteem issues");
        }
    }
}
