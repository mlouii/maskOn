import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from "../../../shared/employee.service";
import {ModalController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent implements OnInit {

  private firstName: string;
  private middleName: string;
  private lastName: string;
  private employeeeId: string;
  private ssn: string;
  private dob: string;
  private sex: string;
  private role: string;
  private salary: number;
  private bonus: number;

  constructor(private http: HttpClient, private employeeService: EmployeeService, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit() {
    this.http.post('http://localhost:5000/auth/HR', {
      employeeid: this.employeeeId,
      ssn: this.ssn,
      firstname: this.firstName,
      middlename: this.middleName,
      lastname: this.lastName,
      sex: this.sex,
      dob: 'NULL',
      salary: 'NULL',
      typeofpay: this.bonus.toString(),
      jobtype: this.role,
      jobtitle: this.salary.toString()
    }).subscribe(
        _ => {
          console.log('lets pop!');
          this.employeeService.fetchEmployees();
          this.modalController.dismiss('hello');
        }
    );
  }

}
