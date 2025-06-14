import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public hide = true
  public error: any;
  public usernameControl = new UntypedFormControl('', [Validators.required])
  public emailControl = new UntypedFormControl('', [Validators.required])
  public passwordControl = new UntypedFormControl('', [Validators.required])
  public passwordConfirmControl = new UntypedFormControl('', [Validators.required])
  public oauthUnavailable: boolean = true
  public rememberMe: UntypedFormControl = new UntypedFormControl(false)

  returnUrl = '';

  constructor (private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  submit() {
    if(this.emailControl.invalid) return;
    if(this.passwordControl.invalid) return;
    this.userService.register({email:this.emailControl.value, password: this.passwordControl.value, confirmPassword: this.passwordControl.value, name: this.usernameControl.value}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl).then(() => {window.location.reload()});
    },
    ({ error }) => {
      this.error = error;
    });
  }

  googleRegister() {

  }

}
