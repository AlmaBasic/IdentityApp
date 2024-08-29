import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidaitonMessagesComponent } from './components/errors/validaiton-messages/validaiton-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/modals/notification/notification.component';
import { routes } from '../app.routes';


@NgModule({
  declarations: [], //standalone componente ne mogu se deklarisati vec se importuju
  imports: [
    CommonModule,
    NotFoundComponent,
    ValidaitonMessagesComponent,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationComponent,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    ValidaitonMessagesComponent
  ],
  providers:[
    HttpClientModule
  ]
})
export class SharedModule { }
