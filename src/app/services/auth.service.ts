import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // tap operatörünü import et
import { SingleReponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/v1/Auth/';

  constructor(private httpClient: HttpClient) { }

  // Giriş yapma işlemi
  login(loginModel: LoginModel): Observable<SingleReponseModel<TokenModel>> {
    return this.httpClient.post<SingleReponseModel<TokenModel>>(this.apiUrl + 'login', loginModel).pipe(
      tap(response => {
        // Token'ı localStorage'a kaydet
        this.saveToken(response.data.token);
      })
    );
  }

  // Token'ı localStorage'a kaydetme
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol etme
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Token'ın var olup olmadığını kontrol etme
    return !!token;
  }

  // Token'ı localStorage'dan silme
  logout(): void {
    localStorage.removeItem('token');
  }
}














































/*import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { TokenModel } from '../models/tokenModel';

import { Observable } from 'rxjs';
import { SingleReponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:5001/api/v1/Auth/'

  constructor(private httpClient:HttpClient) { }

  login(loginModel: LoginModel): Observable<SingleReponseModel<TokenModel>> {
    return this.httpClient.post<SingleReponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }
  
 // aldığımız tokeni tarayıcının hatırlaması için 
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}*/
