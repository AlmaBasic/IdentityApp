import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/account/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  getPlayers(){
    const jwt = this.accountService.getJWT();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.http.get(`${environment.appUrl}/api/play/get-players`, { headers });
  }
}

