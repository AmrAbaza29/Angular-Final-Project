import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { EmpAddEditComponent } from 'src/app/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from 'src/app/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['name', 'email', 'phone', 'address','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'crud-app';
  constructor(private _dialog: MatDialog, private _empService:EmployeeService) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef =this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        this.getEmployeeList();
      },
      error:(err)=>{console.log(err);}
    })
  }
  getEmployeeList(){
    this._empService.getEmployeesList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(del)=>{
        alert("Employee Deleted");
        this.getEmployeeList();
    },
      error:(err)=>{console.log(err);}
    })
  }
  openEditEmployee(data:any){
    const dialogRef=this._dialog.open(EmpAddEditComponent,{data});
    dialogRef.afterClosed().subscribe({
      next:(val)=>{this.getEmployeeList();}
    })
  }
}
