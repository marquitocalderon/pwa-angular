import { Routes } from '@angular/router';
import { PerfilesComponent } from './admin/perfiles/perfiles.component';
import { LoginComponent } from './login/login.component';
import { guardGuard } from './core/guards/guard.guard';


export const routes: Routes = [

    {
       path: '',
       component: LoginComponent,
       title: 'Login'
    },

    
    {
      path: "admin",
      canActivate:[guardGuard],
      data: {permisoRol : ['ADMIN'] },
      loadChildren: () => import('./admin/admin.routes').then(ruta => ruta.ADMIN_RUTAS)
  },

];
