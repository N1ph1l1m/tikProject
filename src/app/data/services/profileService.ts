import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';
import { IPageble } from '../interfaces/pageble.interface';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  cookieService = inject(CookieService)
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  id = this.cookieService.get("id")
  // constructor() {}
  me = signal<IProfile | null>(null)

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`);
  }
  getMe(){
    return this.http.get<IProfile>(`${this.baseApiUrl}account/me`)
    .pipe(
      tap( res => this.me.set(res))
    )
  }
  getSubscribersShortList(subsAmount:number = 3){
    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/${this.id}`)
    .pipe(
      map(res => res.items.slice(0,subsAmount))
)
  }

  getAccount(id:string){
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${id}`)
  }
}
