import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationComponent } from './components/modals/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private dialog: MatDialog) {}

  showNotification(isSuccess: boolean, title: string, message: string) {
    const dialogConfig = {
      data: {
        isSuccess,
        title,
        message
        }
      };

    this.dialog.open(NotificationComponent, dialogConfig);
  }
}
