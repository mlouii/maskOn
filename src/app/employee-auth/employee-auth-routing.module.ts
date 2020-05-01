import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAuthPage } from './employee-auth.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAuthPageRoutingModule {}
