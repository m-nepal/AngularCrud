import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { map, catchError} from 'rxjs/operators';
import { ResolvedEmployeeList } from 'src/app/Models/resolved-employeelist.model';
import { Employee } from 'src/app/Models/employee.model';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private _employeeService: EmployeeService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
            .pipe(           
            catchError((err: string) => of(err))
            );
    }
}