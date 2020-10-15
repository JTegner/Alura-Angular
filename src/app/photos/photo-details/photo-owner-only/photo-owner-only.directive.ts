// exibe o componente se ele for do usuário logado
import { Directive, ElementRef, OnInit, Renderer } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private userService: UserService,
        private renderer: Renderer
    ) {}

    ngOnInit() : void {
        this.userService
            .getUser()
            .subscribe(user => {
                 if(!user || user.id != this.ownedPhoto.userId) {
                    this.renderer
                    .setElementStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}