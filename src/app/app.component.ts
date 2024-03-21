import { Component, OnInit } from '@angular/core';
import { InternetService } from './core/service/internet/internet.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  estadoRed: boolean = false;

  constructor(private servicioRed: InternetService) {}


  verConexion() {
    this.servicioRed.getApi().subscribe({
      next: (data) => {
        console.log(data);
        this.estadoRed = true;
        alert("ESTADO DE SU INTERNET ES " + this.estadoRed);
      },
      error: (error) => {
        console.error(error)
        this.estadoRed = false;
        alert("ESTADO DE SU INTERNET ES " + this.estadoRed);
      }
    });
  }
}
