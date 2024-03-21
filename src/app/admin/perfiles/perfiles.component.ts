import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/service/service.service';
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
  form: FormGroup;

  constructor(private dataService: ServiceService) {
    this.form = new FormGroup({
      nombre_perfil: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const url = import.meta.env.NG_APP_API + '/perfiles';
    this.dataService.getApi(url).subscribe({
      next: (data) => {
        console.log(data);
        this.arregloGet = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  enviarDatos(e:any): void {
    const formulario = this.form.getRawValue();
    const url = import.meta.env.NG_APP_API + '/perfiles';

    this.dataService.postApi(url, formulario).subscribe({
      next: (response) => {
        console.log(response);
        this.getData();
      },
      error: (error) => {
        console.log('Error:', error);

        console.log(error.status);

        if (error.error && (error.error.status === 409 || error.error.status === 400)) {
          alert("salio alerta de erro de validaciones de la base de datos");
        } else if (error.status === 504) {
          console.log('Estoy en 504');
          this.handleLocalStorage(formulario);
        } else {
          alert('Problema en el servidor23');
        }
      }
    });
  }

  handleLocalStorage(formulario: any): void {
    const storedPerfiles = localStorage.getItem('perfiles');
    let perfiles: any[] = [];

    if (storedPerfiles) {
      perfiles = JSON.parse(storedPerfiles);
    }

    const existingProfile = perfiles.find((profile: any) => profile.nombre_perfil === formulario.nombre_perfil);

    if (existingProfile) {
      alert('Ya existe un formulario con el mismo nombre en el localStorage.');
      // Aquí puedes decidir cómo manejar el formulario duplicado.
      // Por ejemplo, puedes sobrescribirlo, fusionarlo, o dejarlo como está.
    } else {
      // No hay un formulario con el mismo nombre, entonces lo almacenamos en el localStorage.
      perfiles.push(formulario);
      localStorage.setItem('perfiles', JSON.stringify(perfiles));
    }
  }
}
