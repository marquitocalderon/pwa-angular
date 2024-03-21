import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InternetService } from '../../core/service/internet/internet.service';
import { SeguridadComponent } from './seguridad/seguridad.component';

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

  constructor(private router: Router, private servicioRed: InternetService) { }

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
      },
      error: (error) => {
        console.error(error);
        this.estadoRed = false;
        alert("ESTADO DE SU INTERNET ES " + this.estadoRed);
      }
    });
  }
}
