import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { ValidaitonMessagesComponent } from '../../shared/components/errors/validaiton-messages/validaiton-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ValidaitonMessagesComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    AccountService,
    HttpClientModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string [] = [];
  returnUrl: string | null = null;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if(user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if (params) {
                this.returnUrl = params.get('returnUrl');
              }
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any)=> {
          if (this.returnUrl) {
            this.router.navigateByUrl('/').then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigateByUrl('/').then(() => {
              window.location.reload();
            });
          }
        },
        error: (error: any) => {
          if(error.error.errors){
            this.errorMessages = error.error.errors;
            console.log(this.errorMessages);
          }else{
            this.errorMessages.push(error.error.message);
          }
        }
      });
    }
  }



}



