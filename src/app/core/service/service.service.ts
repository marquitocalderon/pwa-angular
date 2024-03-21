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
  



  
}
