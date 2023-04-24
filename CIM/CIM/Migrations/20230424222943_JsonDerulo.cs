using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIM.Migrations
{
    /// <inheritdoc />
    public partial class JsonDerulo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagingStepJson",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImagingStepJson",
                value: "[false,false,false,false]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImagingStepJson",
                value: "[false,false,false,false]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImagingStepJson",
                value: "[false,false,false,false]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagingStepJson",
                table: "Devices");
        }
    }
}
