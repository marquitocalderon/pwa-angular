import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as jwt from 'jwt-decode';
import { ServiceService } from '../core/service/service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    // Verifica si hay un token almacenado al cargar el componente
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, bórralo para cerrar la sesión al recargar la página
      localStorage.removeItem('token');
    }
  }

  constructor(private serviceLogin: ServiceService) { }

  showPassword: boolean = false

  loading: boolean = false

  clickMostrarPassword(): void {
    this.showPassword = !this.showPassword
  }

  formulario = new FormGroup({
    usuario: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
  })

  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.hasError('minlength')) {
      return `${controlName} debe tener al menos 4 caracteres.`;
    }
  
    if (control?.hasError('maxlength')) {
      return `${controlName} debe tener al menos 16 caracteres.`;
    }
  
    return '';
  }

  errorEnSolicitud: any

  sendForm() {
    this.loading = true
    const datosEnviar: any = this.formulario.getRawValue();

    this.serviceLogin.postLogin(datosEnviar).subscribe({
      next: (respuesta: any) => {
        // Almacena el token en el localStorage
        localStorage.setItem('token', respuesta.token);

        const decodedToken = jwt.jwtDecode(respuesta.token) as any

        if (decodedToken) {

          if (decodedToken.role === "ADMIN") {
            this.loading = false;
            window.location.href = "/admin";
            this.formulario.reset();
          }
          else if (decodedToken.role === 'USUARIO') {
            this.loading = false;
            window.location.href = "/cliente";
            this.formulario.reset(); 
          }
          else {
            this.formulario.reset();
            this.loading = false;
            window.location.href = "/";
          }
          

        }
        else {
          this.formulario.reset();
          this.loading = false
          window.location.href = "/"
        }
      },
      error: (atrapar) => {

        console.log(atrapar)

        if (atrapar.error.statusCode === 400) {
          this.errorEnSolicitud = atrapar.error.message[0]
          this.loading = false
        }
        else if (atrapar.error.statusCode === 401) {
          this.errorEnSolicitud = atrapar.error.message
          this.loading = false
        }
        else {
          this.errorEnSolicitud = "Error en el servidor"
          this.loading = false
        }
      }
    })

  }

}
