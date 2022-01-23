using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationSystem.Migrations
{
    public partial class AddDaysUsed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "DaysUsed",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DaysUsed_EmployeeId",
                table: "DaysUsed",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_DaysUsed_Employees_EmployeeId",
                table: "DaysUsed",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DaysUsed_Employees_EmployeeId",
                table: "DaysUsed");

            migrationBuilder.DropIndex(
                name: "IX_DaysUsed_EmployeeId",
                table: "DaysUsed");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "DaysUsed");
        }
    }
}
