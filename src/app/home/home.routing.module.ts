import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guards';
import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    { 
        path: '', // significa onde estou que eh o home
        component: HomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            { 
                path: '', //nesse caso '' eh home pq meu path é home
                component: SignInComponent
            },
            { 
                path: 'signup', 
                component: SignUpComponent
            },        
        ]
    },
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

