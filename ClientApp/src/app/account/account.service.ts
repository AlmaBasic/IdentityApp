import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/models/account/user';
import { Register } from '../shared/models/account/register';
import { Login } from '../shared/models/account/login';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

 // private userSource = new ReplaySubject<User | null>(1);
 // user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  refreshUser(jwt: string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, {headers}).pipe(
      map((user: User) => {
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  register(model: Register){
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }

  login(model: Login){
    return this.http.post<User>(`${environment.appUrl}/api/account/login`, model).pipe(
      map((user: User) => {
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }


  getJWT(){
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = localStorage.getItem(environment.userKey);
      if(key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      }
    }
    return null;
  }


  private setUser(user: User){
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }


}


