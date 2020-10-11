import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            //console.log('ativou guarda de rota');
            if(this.userService.isLogged()){
                this.router.navigate(['user', this.userService.getUserName()])
                return false;
            }
            return true; //tem acesso a rota false nao tem acesso
    }
}