import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';
import {EmployeeService} from '../shared/employee.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeAuthGuard implements CanActivate {
    constructor(private employeeService: EmployeeService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        if (this.employeeService.role === 'none') {
            this.router.navigateByUrl('/employee-auth');
            return false;
        }
        return true;
    }
}
