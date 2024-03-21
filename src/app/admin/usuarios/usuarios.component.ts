import { Component, OnInit, inject } from '@angular/core';

import { ServiceService } from '../../core/service/service.service';
import { PostUsuariosComponent } from './post-usuarios/post-usuarios.component';

@Component({
  selector: 'componente-usuarios',
  standalone: true,
  imports: [PostUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  arregloGet: any[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 4;

  constructor(private dataService: ServiceService) { }


  getData(): void {
    const url = import.meta.env.NG_APP_API + '/usuarios';
    this.dataService.getApi(url).subscribe({
      next: (data) =>{
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

  siguientePagina() {
    this.paginaActual++;
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  getPaginacion(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.elementosPorPagina;
    const indiceFinal = indiceInicial + this.elementosPorPagina;
    return this.arregloGet.slice(indiceInicial, indiceFinal);
  }

  // getNumerosPagina(): number[] {
  //   const totalPaginas = Math.ceil(this.arregloGet.length / this.elementosPorPagina);
  //   return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  // }

}
