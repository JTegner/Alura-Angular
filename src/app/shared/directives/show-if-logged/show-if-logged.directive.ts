// exibe o componente se ele for do usuário logado
import { Directive, ElementRef, OnInit, Renderer } from "@angular/core";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private userService: UserService,
        private renderer: Renderer
    ) {}

    ngOnInit(): void {

        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if(user) {
                this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
            } else {
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
       });
    } 
}