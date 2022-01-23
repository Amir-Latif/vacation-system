using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationSystem.Migrations
{
    public partial class autocalculatingtotalcredit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalCredit",
                table: "Employees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalCredit",
                table: "Employees",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
