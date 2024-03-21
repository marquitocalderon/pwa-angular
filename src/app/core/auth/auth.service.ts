import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export default class AuthService {


  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any;
      return decodedToken;
    } else {
      return null;
    }
  }

  tieneToken() {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  tokenExpirado(): boolean {
    const token = this.decodeToken();
    if (token && token.exp) {
      const expDate = new Date(token.exp * 1000); // Convertir la fecha de expiración del token a milisegundos
      const currentDate = new Date();
      return expDate < currentDate; // Devolver true si la fecha de expiración es menor que la fecha actual
    }
    return true; // Devolver true si el token no está presente o no tiene una fecha de expiración
  }

  constructor() { }
}
