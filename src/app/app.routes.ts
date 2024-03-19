import { Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { LoginComponent } from './login/login.component';
import { guardGuard } from './core/guards/guard.guard';


export const routes: Routes = [

    {
       path: '',
       component: LoginComponent,
       title: 'Login'
    },

    {
        path: 'perfiles',
      //   canActivate:[guardGuard],
        component: PerfilesComponent,
        data: {permisoRol : ['ADMIN'] },
        title: 'Perfiles'
     }
];
