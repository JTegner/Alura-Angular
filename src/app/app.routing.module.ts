import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
    { 
        path: '', 
        pathMatch: 'full', //full pq tem que ser exatamente a rota /
        redirectTo: 'home' 
    },
    { 
        path: 'home',
        loadChildren: './home/home.module#HomeModule' 
    },
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent 
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }  
];

@NgModule({
    imports: [ 
        //RouterModule.forRoot(routes) // sem usar o hash na paginacao
        RouterModule.forRoot(routes, { useHash: true }) // para usar o hash # na paginacao
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
