import { Component, OnInit } from '@angular/core';
// import Employee Model
import { Employee } from 'src/app/Models/employee.model';
//import router srvice
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from '../Models/resolved-employeelist.model';

@Component({
  templateUrl: 'list-employees.component.html',
  styleUrls: ['list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  filterEmployees(searchString: string) {
    return this.employees.filter(emp => emp.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }

  // Inject EmployeeService using the constructor
  // The private variable _employeeService which points to
  // EmployeeService singelton instance is then available
  // throughout the class and can be accessed using this keyword
  constructor(private _router: Router, private _route: ActivatedRoute) {
    const resolvedData: Employee[] | string = this._route.snapshot.data['employeeList'];
    if(Array.isArray(resolvedData)){
      this.employees = resolvedData;
    }else{
      this.error = resolvedData;
    }
    this.employees = this._route.snapshot.data['employeeList'];
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onDeleteNotification(id: number){
    const i =  this.filteredEmployees.findIndex( e => e.id === id);
       if(i !== -1){
           this.filteredEmployees.splice(i,1);
       }
  }

  ngOnInit() {
  }  

}
