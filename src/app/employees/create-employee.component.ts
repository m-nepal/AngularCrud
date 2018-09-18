import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import Employee Model
import { Employee } from 'src/app/Models/employee.model';
// import Department Model
import { Department } from 'src/app/Models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

// Import EmployeeService
import { EmployeeService } from 'src/app/employees/services/employee.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})


export class CreateEmployeeComponent implements OnInit {

  //gender = 'male'; //this will make male radio button checked default.
  //isActive = true; //will make default active check box
  //department = '3';//value of option that we want to make selected by default.
  //date picker config
  //default date
  //dateOfBirth: Date = new Date(2018,11,31);
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  datePickerConfig: Partial<BsDatepickerConfig>;

  previewPhoto: boolean = false;
  panelTitle: string;
  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    //datepicker config
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false
        //minDate : new Date(2018,0,1),
        // maxdate: new Date(2018,11,31),
        // dateInputFormat: "MM/DD/YYYY",

      }
    );
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  getEmployee(id: number) {
    if(id === 0 ){
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: "select",
        isActive: null,
        photoPath: null       
      };
      this.createEmployeeForm.reset();
      this.panelTitle = "Create Employee"

    }else{
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err : any) => console.log(err)
      );
      this.panelTitle = "Edit Employee"
    }
  }
  saveEmployee(): void { 
    if(this.employee.id === null)
    {
        this._employeeService.addEmployee(this.employee).subscribe(
          (data: Employee ) => {
            console.log(data);
            this.createEmployeeForm.reset();
            this._router.navigate(['list']);
          },
          (error: any) => console.log(error)
        );
    }else{
        this._employeeService.updateEmployee(this.employee).subscribe(
          () => {            
            this.createEmployeeForm.reset();
            this._router.navigate(['list']);
          },
          (error: any) => console.log(error)
        );
    }
    
   

  }

}
