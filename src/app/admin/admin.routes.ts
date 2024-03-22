import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LayoutadminComponent } from './layoutadmin/layoutadmin.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { IndexedbComponent } from './indexedb/indexedb.component';

export const ADMIN_RUTAS: Routes = [
    {
        path: '',
        component: LayoutadminComponent,
        children: [
            { path: '', component: AdminComponent, },
            { path: 'perfiles', component: PerfilesComponent},
            { path: 'usuarios', component: UsuariosComponent},
            { path: 'index', component: IndexedbComponent},
        ],
        title: 'Admin'
    },
]