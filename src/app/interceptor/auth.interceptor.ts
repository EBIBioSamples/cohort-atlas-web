import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getSessionToken();
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
