import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../core/service/service.service';
import { v4 as uuidv4 } from 'uuid'; // Importamos la función para generar UUIDs

@Component({
  selector: 'app-indexedb',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './indexedb.component.html',
  styleUrl: './indexedb.component.css'
})
export class IndexedbComponent {

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
      next: (data) => {;
        this.arregloGet = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  enviarDatos(e: any): void {
    const formulario = this.form.getRawValue();
    const url = import.meta.env.NG_APP_API + '/perfiles';

    this.dataService.postApi(url, formulario).subscribe({
      next: (response) => {
        console.log(response);
        this.getData();
        this.form.reset();
      },
      error: (error) => {
        console.log('Error:', error);

        if (error.error && (error.error.status === 409 || error.error.status === 400)) {
          alert("Salio alerta de error de validaciones de la base de datos");
        } else if (error.status === 504) {
          console.log('Estoy en 504');
          this.iniciarBaseDatosYAgregarDatos(formulario);
          this.form.reset();
        } else {
          alert('Problema en el servidor');
        }
      }
    });
}

iniciarBaseDatosYAgregarDatos(formulario: any): void {
    const request = window.indexedDB.open("MiBaseDeDatos", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as any).result;
      const objectStore = db.createObjectStore("perfiles", { keyPath: "nombre_perfil" });
      // Puedes definir índices u otras configuraciones aquí si es necesario
    };

    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", (event.target as any).error);
    };

    request.onsuccess = (event) => {
      console.log("Base de datos abierta exitosamente");

      // Una vez que la base de datos esté abierta, agregamos los datos
      this.agregarDatos(formulario);
    };
}

agregarDatos(formulario: any): void {
    const request = window.indexedDB.open("MiBaseDeDatos", 1);
  
    request.onsuccess = (event) => {
      const db = (event.target as any).result;
      const transaction = db.transaction(["perfiles"], "readwrite");
      const objectStore = transaction.objectStore("perfiles");
  
      const nuevoObjeto = {nombre_perfil: formulario.nombre_perfil }; // Utilizamos el campo 'nombre_perfil' del formulario
  
      const getRequest = objectStore.get(nuevoObjeto.nombre_perfil);
  
      getRequest.onsuccess = (event: any) => {
        const existingData = (event.target as any).result;
        console.log(existingData)
        if (existingData) {
          console.log("El dato ya existe en la base de datos:", existingData);
          // Aquí podrías actualizar el dato existente si es necesario
        } else {
          const requestAdd = objectStore.add(nuevoObjeto);
  
          requestAdd.onsuccess = (event: any) => {
            console.log("Datos insertados correctamente");
          };
  
          requestAdd.onerror = (event: any) => {
            console.error("Error al insertar datos:", (event.target as any).error);
          };
        }
      };
  
      getRequest.onerror = (event: any) => {
        console.error("Error al obtener el dato:", (event.target as any).error);
      };
    };
  
    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", (event.target as any).error);
    };
}

eliminarBaseDeDatos(): void {
    const request = window.indexedDB.deleteDatabase("MiBaseDeDatos");
    request.onsuccess = (event) => {
      console.log("Base de datos eliminada con éxito");
    };
    request.onerror = (event) => {
      console.error("Error al eliminar la base de datos");
    };
}

}
