import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import RouterModule
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

//date picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
//custom validator
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';

//import services, component, pipes
import { EmployeeService } from './employees/services/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/services/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/services/employee-list-resolver.service';
import { PageNotFoundComponent } from './pagenotfound.component';
import { EmployeeDetailsGuardService } from './employees/services/employee-details-guard.service';
import { AccordianComponent } from './shared/accordian.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employees/:id', 
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGuardService]
  },
  {
    path: '', redirectTo: '/list', pathMatch: 'full'
  },
  {
    path: 'notfound',
    component: PageNotFoundComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordianComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes /* remove it we are not using it now { enableTracing: true }*/),
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),

  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
