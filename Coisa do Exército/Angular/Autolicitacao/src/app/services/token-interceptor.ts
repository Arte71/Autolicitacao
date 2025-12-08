import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: Auth,
              private injector: Injector
  ) {}
  intercept(req: any, next: any) {
    let authservice = this.injector.get(Auth);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservice.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
