using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationSystem.Migrations
{
    public partial class updatedEmployeeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Vacations",
                table: "Vacations");

            migrationBuilder.RenameTable(
                name: "Vacations",
                newName: "OfficialVacations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OfficialVacations",
                table: "OfficialVacations",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OfficialVacations",
                table: "OfficialVacations");

            migrationBuilder.RenameTable(
                name: "OfficialVacations",
                newName: "Vacations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vacations",
                table: "Vacations",
                column: "ID");
        }
    }
}
