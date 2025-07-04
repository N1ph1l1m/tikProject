import { Component, inject } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';
import {  ProfileService } from '../../data/services/profileService';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  standalone: true,
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles: IProfile[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.profileService.getTestAccounts().subscribe((val) => {
      this.profiles = val;
      this.cdr.detectChanges()
      console.log(this.profiles)
    });
  }
}
