import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        //private titleService: Title
        private activatedRoute: ActivatedRoute 
        ) { }

    ngOnInit(): void {
        //this.activatedRoute.params.subscribe // para pegar os segmentos de rota
        this.activatedRoute.queryParams.subscribe(params => {
            this.fromUrl = params.fromUrl; //params.fromUrl do auth.guard
            //ou
            //this.fromUrl = params['fromUrl']; //para indicar criada dinamicamente
        })
        //this.titleService.setTitle('Login');
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
        .authenticate(userName, password)
        .subscribe(
            //() => console.log('autenticado');
            //() => this.router.navigateByUrl('user/' + userName),
            () => {
                if(this.fromUrl) {
                    this.router.navigateByUrl(this.fromUrl);
                } else {
                    this.router.navigate(['user', userName])
                }
            },
            err => {
                console.log(err);
                this.loginForm.reset();
                this.platformDetectorService.isPlatformBrowser() &&
                    this.userNameInput.nativeElement.focus();
                alert('Invalid user name or password');
            }
        );
    }
}
