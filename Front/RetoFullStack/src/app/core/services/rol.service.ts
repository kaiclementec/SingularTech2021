import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap, map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  get() {
    // return this.http.get<any[]>(`/api/rol`);
    return this.http.get<any>(`/api/rol`)
      .pipe(
        // map(res => res.data),
        mergeMap(data => data.map((res: any) => {
          return { ...res.idProveedor, value: res.id, label: `${res.nombre}` };
        })),
        toArray()
      );

  }
}
