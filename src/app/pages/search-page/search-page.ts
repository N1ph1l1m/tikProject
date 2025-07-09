import { Component, inject } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';
import {  ProfileService } from '../../data/services/profileService';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ChangeDetectorRef } from '@angular/core';
import { ProfileFilters } from "./profile-filters/profile-filters";
@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  standalone: true,
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles

  constructor() {}

}
