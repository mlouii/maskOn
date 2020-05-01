import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Employee} from './employee.model';
import {HttpClient} from '@angular/common/http';
import {ToastController} from '@ionic/angular';
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public firstName: string;
  public role = 'none';
  public activeEmployee;

  public employeesList = new BehaviorSubject<Employee[]>([]);

  constructor(private router: Router, private http: HttpClient, private toastController: ToastController) {}

  login(employeeId: string) {
    this.fetchEmployees().subscribe(
        _ => {
          const scan = this.employeesList.getValue().find(data => data.employeeId === employeeId);
          if (scan) {
            this.firstName = scan.firstName;
            this.role = scan.jobType;
            this.activeEmployee = scan;
            this.router.navigateByUrl('/employee');
          } else {
            this.presentToast('No employee ID of this type found!');
          }
        }
    );
  }

  logout() {
      this.role = 'none';
      this.firstName = null;
      this.activeEmployee = null;
      this.router.navigateByUrl('/employee-auth');
  }

  fetchEmployees() {
    return this.http.get('http://localhost:5000/auth/HR').pipe(
        take(1),
        tap(data => {
          const newEmployees = [];
          // @ts-ignore
          for (const emp of data) {
            const newEmployee = new Employee(
                emp.employeeid,
                emp.ssn,
                emp.firstname,
                emp.middlename,
                emp.lastname,
                emp.sex,
                emp.dob,
                Number(emp.jobtitle),
                emp.typeofpay,
                emp.jobtype
            );
            newEmployees.push(newEmployee);
          }
          this.employeesList.next(newEmployees);
        })
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

}
