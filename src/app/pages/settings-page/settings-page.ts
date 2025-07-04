import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profileService';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader,ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  form = this.fb.group({
      firstName: ['',  Validators.required],
    lastName: ['',  Validators.required],
    username:[''],
    description:[''],
    stack:[''],
  })

  constructor(){
effect(()=>{
  //@ts-ignore
  this.form.patchValue(this.profileService.me())
})

  }

onSave() {
  this.form.markAllAsTouched();
  this.form.updateValueAndValidity();

  if (this.form.invalid) return;
  //@ts-ignore
  this.profileService.patchProfile(this.form.getRawValue()).subscribe({
    next: (res) => console.log('Успешно обновлено:', res),
    error: (err) => console.error('Ошибка PATCH-запроса:', err),
  });
}


}
