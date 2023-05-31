import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  Albums:any;
  ID:any;
  User:any;
  
  constructor(private myActivated:ActivatedRoute,private myService:EmployeeService){
  }
  ngOnInit(): void {
     this.ID=this.myActivated.snapshot.params["id"];
     this.myService.GetEmployeeById(this.ID).subscribe({
      next:(user)=>{
        this.User=user;
        console.log(user);
      },
      error:(err)=>{console.log(err);}
     })
     this.myService.GetAlbumsById(this.ID).subscribe({
      next:(album)=>{
        this.Albums=album;
        console.log(this.Albums);
      },
      error:(err)=>{console.log(err)}
     })
  }

}
