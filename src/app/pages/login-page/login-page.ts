import { Component, inject, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authservice = inject(Auth)
  router = inject(Router)
  isPasswordVisible = signal<boolean>(false);
  form = new FormGroup({
  username: new FormControl("Niiphilim" , Validators.required),
  password: new FormControl("bqNVvYcmc4" , Validators.required)

})

onSubmit(){
  if(this.form.valid){
    //@ts-ignore
    this.authservice.login(this.form.value).subscribe(res=>{
      this.router.navigate([''])
    })

  }

}
isVisible(){
this.isPasswordVisible.set(!this.isPasswordVisible())
}
}
