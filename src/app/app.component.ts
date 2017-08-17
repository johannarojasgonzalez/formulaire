import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {

    public myForm: FormGroup;
    public myForm2: FormGroup;
    @ViewChild( 'confirm' ) public confirm: ElementRef;
    
    constructor(private fb: FormBuilder) {
        
    }

    ngOnInit(): void {
        this.myForm = new FormGroup( {
            username: new FormControl( '', [Validators.required, this.validator1], this.validatorAsync ),
            email: new FormControl( '', this.emailValidator ),
            password: new FormControl( '' ),
            confirmPassword: new FormControl( '' )
            //password: new FormControl( '', this.notMatchPasseword.bind( this ) ) // il est nécessaire d'uitliser le bind pour que le this.confirm match avec le this de la classe
        }, this.passwordMatch );

        // pour initialiser le formulaire (tous les clés sont obligatoires)
        this.myForm.setValue( {
            username: 'johanna',
            email: 'johanna@bip.fr',
            password: '1234',
            confirmPassword: ''
        } );

        // pour initialiser le formulaire (tous les clés NE sont PAS obligatoires)
        this.myForm.patchValue( {
            username: 'pepita'
        } );

        this.myForm.get( 'username' ).errors // liste de clés avec les erreurs pour le control username

        this.myForm2 = this.fb.group({
            username2: ['', Validators.required],
            email2: [''],
            hobbies: this.fb.array([]),
            password2: [''],
        });
        
        this.myForm2.valueChanges.subscribe( value => console.log(value));
        this.myForm2.statusChanges.subscribe( status => console.log(status));

//        this.myForm2 = new FormGroup( {
//            username2: new FormControl( '' ),
//            hobbies: new FormArray( [] ),
//            email2: new FormControl( '' ),
//            password2: new FormControl( '' )
//        } );
    }

    addHobby(): void {
        ( <FormArray>this.myForm2.get( 'hobbies' ) ).controls.push( new FormControl( '' ) );
    }

    validator1( formControl: FormControl ): { [s: string]: boolean } {
        if ( formControl.value === 'paul' ) {
            return { isPaul: true };
        } else {
            return null;
        }
    }

    emailValidator( control: FormControl ): { [s: string]: boolean } {
        if ( !control.value.match( /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ ) ) {
            return { emailValidator: control.value };
        }
    }

    validatorAsync( formControl: FormControl ): Promise<any> | Observable<any> {
        return new Promise(( resolve, reject ) => {
            setTimeout(() => {
                resolve( null );
            }, 30000 );
        } );
    }

    notMatchPasseword( control: FormControl ): { [s: string]: boolean } {
        if ( control.value != this.confirm.nativeElement.value ) {
            return { notMatch: true };
        }
    }

    passwordMatch( group: FormGroup ): { [s: string]: boolean } {
        if ( group.get( 'password' ).value != group.get( 'confirmPassword' ).value ) {
            console.log( "password not match" )
            return { notMatch: true };
        }
    }

    submit(): void {
        console.log( this.myForm2 );
        //        this.myForm.reset( {
        //            email: 'exemple@exemple.fr'
        //        } );
    }
}
