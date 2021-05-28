import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario.routing';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { SharedModule } from '../../shared/shared.module';
import { RegeditUsuariosComponent } from './regedit-usuarios/regedit-usuarios.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    RegeditUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    MatDialogModule,
    SharedModule
  ]
})
export class UsuarioModule { }
