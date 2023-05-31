import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  constructor(private _empService:EmployeeService,
              private _dialogRef:DialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb:FormBuilder){}
  //   empForm= new FormGroup({
  //   name:new FormControl('',[Validators.required, Validators.maxLength(30), Validators.minLength(8)]),
  //   email:new FormControl('',Validators.required),
  //   phone:new FormControl('', [Validators.minLength(11), Validators.maxLength(25)]),
  //   address:new FormGroup({
  //     city:new FormControl('',[Validators.required]),
  //     street:new FormControl('',Validators.required),
  //     zipcode:new FormControl('', Validators.required),
  //   })
  // });
  empForm=this.fb.group({
    name:['',[Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
    email:['',Validators.required],
    phone:['', [Validators.minLength(11), Validators.maxLength(25), Validators.required]],
    address:this.fb.group({
      city:['', Validators.required],
      street:['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      zipcode:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    })
  });

  ngOnInit(): void {
   this.empForm.patchValue(this.data);
  }
  
  city:string[]=[
    "Alex",
    "Cairo",
    "Ismailia",
    "Port Saiz",
    "Zagazig",
    'Gwenborough',
    'Wisokyburgh',
    'McKenziehaven',
    'South Elvis',
    'Roscoeview',
    'South Christy',
    'Howemouth',
    'Aliyaview',
    'Bartholomebury',
    'Lebsackbury'
  ];
  OnFormSubmit(){
      if(this.empForm.valid){
        if(this.data){
          this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
            next:(val:any)=>{
              alert("Employee Updated Successfully");
              this._dialogRef.close();
            },
            error:(err:any)=>{
              alert(err);
            }
          });
        }else{
          this._empService.addEmployee(this.empForm.value).subscribe({
            next:(val:any)=>{
              alert("Employee Added Successfully");
              this._dialogRef.close();
            },
            error:(err:any)=>{
              alert(err);
            }
          });
        }
        
      }
  }
}
