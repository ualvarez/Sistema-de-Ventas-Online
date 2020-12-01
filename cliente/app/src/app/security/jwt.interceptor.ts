import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiauthService } from '../services/apiauth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private apiauthService: ApiauthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuario = this.apiauthService.usuarioData;

        if (usuario) {
            debugger
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }

        return next.handle(request);
    }
}