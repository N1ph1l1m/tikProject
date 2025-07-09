import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, first, last, startWith, switchMap } from 'rxjs';
import { ProfileService } from '../../../data/services/profileService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss'
})
export class ProfileFilters {
form: any;
fb = inject(FormBuilder)
profileService = inject(ProfileService)
searchForm = this.fb.group({
  firstName:[''],
  lastName:[''],
  stack:['']

})

constructor(){
  this.searchForm.valueChanges
  .pipe(
    startWith({}),
    debounceTime(300),
    switchMap(formValue =>{
      return  this.profileService.filterProfiles(formValue)
    }),
    takeUntilDestroyed()
  )
  .subscribe()
}
}
