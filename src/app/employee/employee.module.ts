import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import {EmployeeSectionComponent} from './employee-section/employee-section.component';
import {EmployeeModalComponent} from './employee-section/employee-modal/employee-modal.component';
import {SalesSectionComponent} from './sales-section/sales-section.component';
import {EngineerSectionComponent} from './engineer-section/engineer-section.component';
import {EngineerModalComponent} from './engineer-section/engineer-modal/engineer-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule
  ],
    declarations: [EmployeePage, EmployeeSectionComponent, EmployeeModalComponent, SalesSectionComponent, EngineerSectionComponent, EngineerModalComponent],
  entryComponents: [EmployeeModalComponent, EngineerModalComponent]
})
export class EmployeePageModule {}
