import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-auth',
  templateUrl: './employee-auth.page.html',
  styleUrls: ['./employee-auth.page.scss'],
})
export class EmployeeAuthPage implements OnInit {

  private employeeID = '';
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.employeeService.login(this.employeeID);
  }

  switchAuth() {
    this.router.navigateByUrl('/auth');
  }
}
