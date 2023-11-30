import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _fb: FormBuilder,
    
  ){}

  public myForm: FormGroup = this._fb.group({
    email: [ '', [ Validators.email,Validators.required ] ],
    password: [ '', [ Validators.required,Validators.minLength(6) ] ],
  })

  login(){
    console.log(this.myForm.value);
  }

  fieldIsInvalidReactive(field:string): boolean{ //! BOOLEANO
    return ( this.myForm.controls[field].errors && this.myForm.controls[field].touched ) || false;
  }

  fieldErrors(field:string){
    console.log( this.myForm.controls[field].errors);
    return this.myForm.controls[field].errors;
  }

}
