import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';

const routes: Routes = [
  {
    path: 'lista-roles',
    component: ListaRolesComponent
  },
  {
    path: '',
    component: ListaRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
