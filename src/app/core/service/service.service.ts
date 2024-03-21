import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlApi = import.meta.env.NG_APP_API + '/auth/login';

  constructor(private http: HttpClient) { }

  postLogin(datosRecolectados: any): Observable<any> {
    // Asegúrate de que la solicitud HTTP devuelve un objeto de tipo interfaceLogin
    const respuesta =  this.http.post<any>(this.urlApi, datosRecolectados);
    return respuesta
  }

  public postApi(url: string, datos: any): Observable<any> {
    return this.http.post(url, datos);
  }


  
  // Método para realizar la consulta a la API
  public getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  postApiFromLocalStorageItems(items: [string, any][]): Observable<any>[] {
    let observables: Observable<any>[] = [];
  
    items.forEach(item => {
      let clave = item[0];
      let valor = item[1];
  
      console.log(clave);
      console.log(valor);
  
      // Verificar si el valor es un array de objetos
      if (Array.isArray(valor) && valor.length > 0 && typeof valor[0] === 'object') {
        // Construir la URL utilizando la clave
        let url = `https://backend-vercel-psi.vercel.app/${clave}`;
  
        // Realizar un map sobre los objetos dentro del array de objetos
        let datos = valor.map(objeto => {
          return this.http.post(url, objeto);
        });
  
        // Agregar los observables generados a la lista de observables
        observables.push(...datos);
      }
    });
  
    return observables;
  }
  
  



  
}
