import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true
  public error: any;
  public emailControl = new UntypedFormControl('', [Validators.required])
  public passwordControl = new UntypedFormControl('', [Validators.required])
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
    this.userService.login({email:this.emailControl.value, password: this.passwordControl.value}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl).then(() => {window.location.reload()});
    },
    ({ error }) => {
      this.error = error;
    });
  }

  googleLogin() {

  }

}
