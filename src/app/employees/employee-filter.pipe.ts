import { PipeTransform, Pipe } from '@angular/core'
import { Employee } from '../Models/employee.model';

@Pipe({
    name:'employeeFilter',
    pure: true
})
export class EmployeeFilterPipe implements PipeTransform {
    private counter = 0;
    transform(employees: Employee[], searchTerm: string): Employee[]{
        this.counter ++;
        console.log('Filter pipe executed count ' + this.counter)
        if(!employees || !searchTerm){
            return employees;
        }
        return employees.filter( emp => emp.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    }

}