import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { SailsComponent } from './sails/sails.component';

const routes: Routes = [
  { path: '', data: { title: 'Inicio' }, component: HomeComponent },
  { path: 'clients', data: { title: 'Clientes' }, component: ClientsComponent },
  { path: 'products', data: { title: 'Productos' }, component: ProductsComponent },
  { path: 'sails', data: { title: 'Ventas' }, component: SailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
