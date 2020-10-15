// exibe o componente se ele for do usuário logado
import { Directive, ElementRef, OnInit, Renderer } from "@angular/core";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private userService: UserService,
        private renderer: Renderer
    ) {}

    ngOnInit(): void {
        !this.userService.isLogged()
            && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');

    }
}