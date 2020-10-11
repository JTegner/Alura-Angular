import { Component, Input } from '@angular/core';

const cloud = 'http://localhost:3000/imgs';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    
    private _url = '';
    
    @Input() description='';
    
    //@Input() url='';

    @Input() set url(url: string) {
        this._url = url;
    }

    get url() {
        return this._url;
    }

}