import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from "../../service/auth.service";

// import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    // private accountService: AccountService,
    // private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.authService.getWebinToken(this.form.get('username').value, this.form.get('password').value, () => this.router.navigateByUrl('/register'));

    this.loading = true;
    // this.accountService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);
    //     },
    //     error: error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   });
  }
}
