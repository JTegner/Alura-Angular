import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges // porque retorna um observable
                .pipe(debounceTime(300)) // para nao ir ao backend a cada digito
                .pipe(switchMap(userName =>
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());
        }
    }
}