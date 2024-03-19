import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../core/service/service.service';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [],
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


}
