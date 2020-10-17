import { ErrorHandler } from "@angular/core";
import * as StackTrace from 'stacktrace-js';

export class GlobalErrorHandler implements ErrorHandler { 

    handleError(error: any): void {
        console.log('passei pelo handler');
        //throw new Error("Method not implemented");
        StackTrace
        .fromError(error)
        .then(stackFrames => {
            //console.log(stackFrames);
            const stackAsString = stackFrames
                .map(sf => sf.toString())
                .join('\n');
            console.log(error);
            console.log(stackAsString);
        })
    }
}