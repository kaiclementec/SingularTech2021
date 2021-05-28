import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles.routing';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { RegeditRolesComponent } from './regedit-roles/regedit-roles.component';


@NgModule({
  declarations: [
    ListaRolesComponent,
    RegeditRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
