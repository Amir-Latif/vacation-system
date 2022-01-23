using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationSystem.Migrations
{
    public partial class VacationTypetoVacationRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VacationType",
                table: "VacationRequests",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VacationType",
                table: "VacationRequests");
        }
    }
}
