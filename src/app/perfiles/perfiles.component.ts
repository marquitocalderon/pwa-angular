import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../core/service/service.service';
import { AuthService } from '../core/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.css'
})
export class PerfilesComponent implements OnInit {

  arregloGet: any[] = [];
  constructor(private dataService: ServiceService) { }

  getData(): void {
    const url = import.meta.env.NG_APP_API + '/perfiles';
    this.dataService.getApi(url).subscribe({
      next: (data) =>{
       console.log(data);
       this.arregloGet = data
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
    nombre_perfil: new FormControl(''),
  });

  
  enviarDatos(e:any) {
    const formulario = this.form.getRawValue();
    const url = import.meta.env.NG_APP_API + '/perfiles';
    this.dataService.postApi( url, formulario).subscribe({
      next: (response) => {
       console.log(response)
       this.getData();
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejo de errores
      }
    });


  }


}
