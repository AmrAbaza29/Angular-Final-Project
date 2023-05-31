import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  Photos:any;
  ID:any;
  uID:any;
  User:any;

  constructor(private myActivated:ActivatedRoute,private myService:EmployeeService){
  }
  ngOnInit(): void {
     this.ID=this.myActivated.snapshot.params["id"];
     this.uID=this.myActivated.snapshot.params["uId"];
     this.myService.GetEmployeeById(this.uID).subscribe({
      next:(user)=>{
        this.User=user;
        console.log(user);
      },
      error:(err)=>{console.log(err);}
     })
     this.myService.GetPhotosById(this.ID).subscribe({
      next:(images)=>{
        this.Photos=images;
        console.log(this.Photos);
      },
      error:(err)=>{console.log(err)}
     })
  }
}
