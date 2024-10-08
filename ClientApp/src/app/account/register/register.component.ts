import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ValidaitonMessagesComponent } from '../../shared/components/errors/validaiton-messages/validaiton-messages.component';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ValidaitonMessagesComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [
    AccountService,
    HttpClientModule
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string [] = [];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router){
      // ne radi
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user: User | null) => {
          if(user){
            this.router.navigateByUrl('/');
          }
        }
      })
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })

  }

  register(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.sharedService.showNotification(true, response.value.title, response.value.message)
          this.router.navigateByUrl('/account/login');
          console.log(response);
        },
        error: (error: any) => {
          if(error.error.errors){
            this.errorMessages = error.error.errors;
            console.log(this.errorMessages);
          }else{
            this.errorMessages.push(error.error);
          }
        }
      });
    }
  }


}
