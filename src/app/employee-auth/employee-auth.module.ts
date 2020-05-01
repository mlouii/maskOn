import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAuthPageRoutingModule } from './employee-auth-routing.module';

import { EmployeeAuthPage } from './employee-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAuthPageRoutingModule
  ],
  declarations: [EmployeeAuthPage]
})
export class EmployeeAuthPageModule {}
