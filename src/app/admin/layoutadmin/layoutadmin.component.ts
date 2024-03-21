import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InternetService } from '../../core/service/internet/internet.service';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ServiceService } from '../../core/service/service.service';

@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SeguridadComponent, RouterLinkActive],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.css'
})
export class LayoutadminComponent implements OnInit {

  sideBardOpen: boolean = false;
  ruta: string = "";
  estadoRed: boolean = false;

  constructor(private router: Router, private servicioRed: InternetService, private servicioApi: ServiceService) { }

  ngOnInit() {
    this.ruta = this.router.url;
  }

  clickMenu() {
    this.sideBardOpen = !this.sideBardOpen;
  }

  verConexion() {
    this.servicioRed.getApi().subscribe({
      next: (data) => {
        this.estadoRed = true;
        alert("ESTADO DE SU INTERNET ES " + this.estadoRed);
  
        // Obtener los datos del localStorage excepto el token
        let datos = this.getAllLocalStorageItemsExceptToken();
  
        // Enviar las solicitudes HTTP POST para cada elemento en datos
        let observables = this.servicioApi.postApiFromLocalStorageItems(datos);
  
        // Manejar los observables resultantes
        observables.forEach(observable => {
          observable.subscribe({
            next: (response) => {
              console.log("Solicitud POST exitosa:", response);
              // Aquí puedes manejar la respuesta si es necesario
            },
            error: (error) => {
              console.error("Error en la solicitud POST:", error);
              // Aquí puedes manejar el error si es necesario
            }
          });
        });
      },
      error: (error) => {
        console.error(error);
        this.estadoRed = false;
        alert("ESTADO DE SU INTERNET ES " + this.estadoRed);
      }
    });
  }

  getAllLocalStorageItemsExceptToken(): [string, any][] {
    let items: [string, any][] = [];
  
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== null && key !== 'token') { // Excluir la clave 'token'
        let value = localStorage.getItem(key);
        if (value !== null) {
          items.push([key, JSON.parse(value)]);
        }
      }
    }
  
    return items;
  }
  
  
}
