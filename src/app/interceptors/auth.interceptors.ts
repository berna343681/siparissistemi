// sen bir istekte buluyorsun, oda token koyuyor
// servis bir hata verdiğinde ne yapayım ???
// request : ürün eklemek
// next: pakete birşey yollucam öyle vericem
// devreye girmesi için app.module de devreye sokucaz

// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al

    let newRequest = request; // Varsayılan olarak mevcut isteği kullan

    if (token) { // Token mevcutsa
      // Token'ı başlığa ekle
      newRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
    } else {
      console.warn('Token bulunamadı'); // Token mevcut değilse uyarı ver
    }

    return next.handle(newRequest); // İsteği devam ettir
  }
}
















































/*import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    let newRequest: HttpRequest<any>;           // Yeni bir istek oluştur
    if ("eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU3lzdGVtIEFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGVyc29uIiwibmJmIjoxNzI1MjA0OTIwLCJleHAiOjE3MjUyMDU1MjAsImlzcyI6Ind3dy5kZXZhcmNoaXRlY3R1cmUuY29tIiwiYXVkIjoid3d3LmRldmFyY2hpdGVjdHVyZS5jb20ifQ.KPTyUhW3IQ9BAF40Ga3Rj2dLELS2G5aQ82Cwm0QcRRM") {                               // Token mevcutsa başlığa ekle
      newRequest = request.clone({
       headers: request.headers.set("Authorization", "Bearer " + token) // "Bearer " ve token arasında boşluk bırak
      });
    } else {
      newRequest = request;
    }
    return next.handle(newRequest);            // İsteği devam ettir
  }
} */
