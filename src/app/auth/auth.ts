import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITokenResponse } from './auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor() { }
  http = inject(HttpClient)
  router = inject(Router)
  cookieService = inject(CookieService)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';


  token:string | null = null;
  id:string | null = null;
  refreshToken:string |null  = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get("token")
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  login(payload:{username:string,password:string}){
    const fd = new FormData()
    fd.append('username',payload.username)
    fd.append('password',payload.password)
    return this.http.post<ITokenResponse>(`${this.baseApiUrl}token`,fd)
    .pipe(
      tap(val =>{
       this.saveTokens(val)
      })
    )
  }
  refreshAuthToken(){
    return this.http.post<ITokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
           refresh_token:this.refreshToken,

      }
    )
  }

   logout(){
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  saveTokens(res:ITokenResponse){
    this.token = res.access_token
    this.id = res.id
    this.refreshToken = res.refresh_token
    this.cookieService.set("token",this.token)
    this.cookieService.set("refreshToken", this.refreshToken)
    this.cookieService.set("idAccount", this.id)
  }

   refrestAuthToken(){
    return  this.http.post<ITokenResponse>(`${this.baseApiUrl}token`,
    {
      refresh_token:this.refreshToken,
    }
  ).pipe(
    tap(val=>{
      this.saveTokens(val)
    }),
    catchError(err=>{
    this.logout()
    return throwError(err)
    })
  )}


}
