import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {Employee} from '../../shared/employee.model';
import {ModalController} from '@ionic/angular';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee-section',
  templateUrl: './employee-section.component.html',
  styleUrls: ['./employee-section.component.scss'],
})
export class EmployeeSectionComponent implements OnInit {

  private employees: Employee[];
  private totalSalary = 0;
  private totalBonuses = 0;


  constructor(private employeeService: EmployeeService, private modalController: ModalController) { }

  ngOnInit() {
    this.employeeService.fetchEmployees().subscribe(
        _ => {
          this.employees = this.employeeService.employeesList.getValue();
          this.calculateSalaryAndBonuses();
          console.log(this.totalBonuses);
        }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EmployeeModalComponent
    });
    modal.onDidDismiss().then(
        _ => {
          this.employeeService.fetchEmployees().subscribe(
              _ => {
                this.employees = this.employeeService.employeesList.getValue();
                this.calculateSalaryAndBonuses();
              }
          );
        }
    );
    return modal.present();
  }

  calculateSalaryAndBonuses() {
      this.totalBonuses = 0;
      this.totalSalary = 0;
      for (const employee of this.employees) {
          this.totalSalary += Number(employee.salary);
          this.totalBonuses += Number(employee.bonus);
      }
  }

}
