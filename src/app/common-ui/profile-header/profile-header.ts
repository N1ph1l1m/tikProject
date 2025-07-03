import { IProfile } from './../../data/interfaces/profile.interface';
import { Component,input } from '@angular/core';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss'
})
export class ProfileHeader {
profile =  input<IProfile>()
}
