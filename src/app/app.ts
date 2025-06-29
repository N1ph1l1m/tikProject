import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from './common-ui/profile-card/profile-card';
import { Profile } from './data/services/profile';
import { CommonModule, JsonPipe } from '@angular/common';
import { IProfile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard, CommonModule],

  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'tikProject';
  profileService = inject(Profile);
  profiles: IProfile[] = [];
  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      this.profiles = val;
    });
  }
}
