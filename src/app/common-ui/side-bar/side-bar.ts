import { Component, inject } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profileService';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";

@Component({
  selector: 'app-side-bar',
  imports: [SvgIcon, SubscriberCard, RouterModule, AsyncPipe, ImgUrlPipe],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {

profileService = inject(ProfileService)
subscribers$  = this.profileService.getSubscribersShortList()

me = this.profileService.me

 menuItems=[
  {
   label:"Моя страница",
   icon:"home",
    link:"profile/me"
  },
   {
   label:"Чаты",
   icon:"chat",
   link:"chats"
  },
   {
   label:"Поиск",
   icon:"search",
   link:"search"
  }
 ]
 ngOnInit(){
  firstValueFrom(this.profileService.getMe())
 }
}
