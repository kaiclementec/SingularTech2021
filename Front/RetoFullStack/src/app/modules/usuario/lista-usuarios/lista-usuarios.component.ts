import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../../../core/services/usuario.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { RegeditUsuariosComponent } from '../regedit-usuarios/regedit-usuarios.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  columnDefs = [
    // {
    //   headerName: 'Id',
    //   field: 'id',
    //   pinned: 'left',
    //   lockPosition: true
    // },
    {
      headerName: 'Nombres',
      field: 'nombres',
    }, {
      headerName: 'Apellidos',
      field: 'apellidos',
    },
    {
      headerName: 'Correo',
      field: 'correoElectronico',
    },
    {
      headerName: 'Fecha Nacimiento',
      field: 'fechaNacimiento',
      cellRenderer: (data: any) => {
        return data.value ? formatDate(data.value, 'dd/MM/yyyy', this.locale) : '';
      }
    },
    {
      headerName: 'Edad',
      field: 'fechaNacimiento',
      cellRenderer: (data: any) => {
        let years = moment().diff(formatDate(data.value, 'yyyy-MM-dd', this.locale), 'years');
        return data.value ? years : '';
      }
    },

  ]
  rowData = this.usuario.get().pipe(tap(console.log));
  constructor(
    private usuario: UsuarioService,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  addRow(gridApi: any) {
    console.log(gridApi);
    const dialog = this.dialog.open(RegeditUsuariosComponent, {
      width: '920px',
      disableClose: true
    });

    dialog.afterClosed().subscribe(status => {
      if (status) {
        this.rowData = this.usuario.get();
      }
    });
  }
}
