import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OwnersComponent } from './components/owners/owners.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { Auth } from './auth/auth';
import { AnimalComponent } from './components/animal/animal.component';
import { ProductsComponent } from './components/products/products.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { ServicesComponent } from './components/services/services.component';
import { AdoptionListComponent } from './components/adoption-list/adoption-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Auth },
  { path: 'ecommerce', component: EcommerceComponent },
  { path: 'owners', component: OwnersComponent },
  { path: 'employees', component: EmployeeComponent },
  {path: 'animals', component: AnimalComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'adoptions', component: AdoptionComponent},
  {path: 'services', component: ServicesComponent},
  { path: 'adoptions-list', component: AdoptionListComponent },


];
