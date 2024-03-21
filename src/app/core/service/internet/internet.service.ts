import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetService {
  constructor(private http: HttpClient) {}

  // URL de la API
  private url = 'https://backend-vercel-psi.vercel.app/perfiles';

  // Método para realizar la consulta a la API
  public getApi() : Observable<string>  {
    return this.http.get<any>(this.url);
  }
}
