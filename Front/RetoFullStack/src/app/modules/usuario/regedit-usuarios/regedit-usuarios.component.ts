import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RolService } from '../../../core/services/rol.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../core/services/usuario.service';


@Component({
  selector: 'regedit-usuarios',
  templateUrl: './regedit-usuarios.component.html',
  styleUrls: ['./regedit-usuarios.component.scss']
})
export class RegeditUsuariosComponent implements OnInit {

  formUser: FormGroup = this.fb.group({
    nombres: [''],
    apellidos: [''],
    correoElectronico: [''],
    rolID: ['', Validators.required],
    fechaNacimiento: [''],
    password: [''],
    repassword: ['']
  });

  dataRoles = this.rolService.get().pipe(tap(console.log));

  constructor(
    public dialogRef: MatDialogRef<RegeditUsuariosComponent>,
    private fb: FormBuilder,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
  }
  guardar() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
      this.toastr.error('Debe registrar los campos Obligatorios');
      return;
    }

    //   [
    //     {
    //         "id": 1,
    //         "rolID": 1,
    //         "nombres": "Kai",
    //         "apellidos": "Clemente",
    //         "correoElectronico": "kai@proyectof5.pe",
    //         "fechaNacimiento": "1986-11-29T00:00:00",
    //         "password": "123456"
    //     }
    // ]
    let regUsuer: any = {
      rolID: this.formUser.controls.rolID.value?.value,
      nombres: this.formUser.controls.nombres.value,
      apellidos: this.formUser.controls.apellidos.value,
      correoElectronico: this.formUser.controls.correoElectronico.value,
      // fechaNacimiento: this.formUser.controls.fechaNacimiento.value,
      FechaNacimientoString: '1986-11-29T00:00:00',
      password: this.formUser.controls.password.value

    }
    console.log('regUsuer', regUsuer);
    this.usuarioService.post(regUsuer).subscribe(
      res => {
        console.log('usuarioService post', res);
        this.dialogRef.close(true);
      },
      err => {
        console.log('usuarioService post err', err);
      }
    );
  }
  close() {
    this.dialogRef.close(false);
  }
}
