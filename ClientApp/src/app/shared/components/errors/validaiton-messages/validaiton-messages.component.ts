import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validaiton-messages',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './validaiton-messages.component.html',
  styleUrl: './validaiton-messages.component.css'
})
export class ValidaitonMessagesComponent {
  @Input() errorMessages: string[] | undefined; // = [];
}
