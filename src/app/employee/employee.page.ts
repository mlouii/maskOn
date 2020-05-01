import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

}
