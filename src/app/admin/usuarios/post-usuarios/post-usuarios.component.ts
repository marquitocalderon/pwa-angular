import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../core/service/service.service';
import AuthService from '../../../core/auth/auth.service';

@Component({
  selector: 'componente-post-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-usuarios.component.html',
  styleUrl: './post-usuarios.component.css'
})
export class PostUsuariosComponent implements OnInit {
  formData: any = {};
  estaOjito : boolean = false;

  clickOjo () : void {
    this.estaOjito = !this.estaOjito;
  }
  
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  imageUrl: string | ArrayBuffer | null = null;

  imagenParaEnviar: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.imagenParaEnviar = file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          this.imageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(private dataService: ServiceService) { }
  authService = inject(AuthService);

  perfiles: any[] = []

  getData(): void {
    const url = import.meta.env.NG_APP_API + '/perfiles';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.tieneToken()}`, // Invoke the method to get the token
    });
    this.dataService.getApi( url).subscribe({
      next: (data) =>{
       this.perfiles = data
      },
      error: (atrapar)=>{
        console.log(atrapar)
      }
    })
  }
  ngOnInit(): void {
    this.getData();
  }

  form: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    perfiles: new FormControl(''),
  });

  enviarDatos(e:any) {
      const formData = new FormData(e.target);
      // formData.append('usuario', this.form.get('usuario')?.value);
      // formData.append('password', this.form.get('password')?.value);
      // formData.append('idperfil', this.form.get('perfiles')?.value);
      // if (this.imagenParaEnviar) { // Verifica si hay un archivo seleccionado
      //   formData.append('imagen', this.imagenParaEnviar);
      // }


      const url = import.meta.env.NG_APP_API + '/usuarios';

      this.dataService.postApi( url, formData).subscribe({
        next: (response) => {
         window.location.reload();
        },
        error: (error) => {
          console.error('Error:', error);
          // Manejo de errores
        }
      });
  }
}
