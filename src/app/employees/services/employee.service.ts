import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/employee.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = 'http://localhost:3000/employees';
    //get the list of  employee
    getEmployees(): Observable<Employee[]> {
        // return of(this.listEmployees).pipe(delay(2000));//angualr 6
        return this.httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }
    //
    //get the list of  employee
    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
    //
    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
}
