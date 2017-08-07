import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {

    public myForm: FormGroup;

    ngOnInit(): void {
        this.myForm = new FormGroup( {
            username: new FormControl( '' ),
            email: new FormControl( '' ),
            password: new FormControl( '' )
        } );

        // pour initialiser le formulaire (tous les clés sont obligatoires)
        this.myForm.setValue( {
            username: 'johanna',
            email: 'johanna@bip.fr',
            password: '1234'
        } );

        // pour initialiser le formulaire (tous les clés NE sont PAS obligatoires)
        this.myForm.patchValue( {
            username: 'pepita'
        } )
    }

    submit(): void {
        console.log( this.myForm );
        this.myForm.reset( {
            email: 'exemple@exemple.fr'
        } );
    }
}
