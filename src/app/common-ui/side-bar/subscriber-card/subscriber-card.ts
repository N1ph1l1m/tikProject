import { Component, Input } from '@angular/core';

import { IProfile } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url-pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe,RouterLink],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss'
})
export class SubscriberCard {

  @Input() profile!:IProfile
}
