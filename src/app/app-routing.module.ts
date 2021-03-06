import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {EmployeeAuthGuard} from './employee-auth/employee-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'shop',
    canActivate: [AuthGuard],
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'my-page',
    canActivate: [AuthGuard],
    loadChildren: () => import('./my-page/my-page.module').then( m => m.MyPagePageModule)
  },
  {
    path: 'employee-auth',
    loadChildren: () => import('./employee-auth/employee-auth.module').then( m => m.EmployeeAuthPageModule)
  },
  {
    path: 'employee',
    canActivate: [EmployeeAuthGuard],
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
