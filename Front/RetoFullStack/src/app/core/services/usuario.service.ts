
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL = `${environment.HOST_API}/usuario`;

  constructor(private http: HttpClient) { }
  dataTest = of([
    {
      id: 1,
      rolID: 1,
      nombres: "Kai",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 2,
      rolID: 1,
      nombres: "Mario",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 3,
      rolID: 1,
      nombres: "Martin",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 4,
      rolID: 1,
      nombres: "Carlos",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 5,
      rolID: 1,
      nombres: "Fenandez",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 6,
      rolID: 1,
      nombres: "Tontin",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    },
    {
      id: 7,
      rolID: 1,
      nombres: "Marco",
      apellidos: "Clemente",
      correoElectronico: "kai@proyectof5.pe",
      fechaNacimiento: "1986-11-29T00:00:00",
      password: "123456"
    }
  ])

  get() {
    console.log(this.URL);
    // return this.http.get<any[]>(`${this.URL}`);
    return this.http.get<any[]>(`/api/usuario`);
  }
  post(usuario: any) {
    return this.http.post<any>(`/api/usuario`, usuario)

  }
}
