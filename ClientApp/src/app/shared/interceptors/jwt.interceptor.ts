import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('hello')
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        console.log("user jwt"+user?.jwt)
        if(user && user.jwt){
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt} `
            }
          });
        }
        console.log(user)
      }
    })
    return next.handle(request);
  }
}
