import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profileService';
import { firstValueFrom } from 'rxjs';
import { AvatarUpload } from './avatar-upload/avatar-upload';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';
import { Auth } from '../../auth/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader,ReactiveFormsModule,AvatarUpload,SvgIcon],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {
  fb = inject(FormBuilder)

  @ViewChild(AvatarUpload) avatarUploader!:any

  profileService = inject(ProfileService)
  me = this.profileService.me
  auth = inject(Auth)

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    username:[''],
    description:[''],
    stack:[''],
  })

  constructor(private location : Location){
effect(()=>{
  //@ts-ignore
  this.form.patchValue({
    ...this.profileService.me(),
      //@ts-ignore
    stack:this.mergeStack(this.profileService.me()?.stack)
  })
})
  }

  ngAfterViewInit(){
    this.avatarUploader.avatar
  }

onSave() {
  this.form.markAllAsTouched();
  this.form.updateValueAndValidity();

  if (this.form.invalid) return;
if(this.avatarUploader.avatar){
 firstValueFrom( this.profileService.uploadAvatar(this.avatarUploader.avatar))
}
  //@ts-ignore

  firstValueFrom(this.profileService.patchProfile({
    ...this.form.value,
    stack:this.splitStack(this.form.value.stack)
  }))
}

splitStack(stack:string |null | string[] | undefined){
  if(!stack) return []
  if(Array.isArray(stack)) return stack

return stack.split(",")
}

mergeStack(stack:string|null | [] | undefined){
  if(!stack) ''
  if(Array.isArray(stack)) return stack.join(',')

return stack
}

logOut(){
  this.auth.logout()
}
goBack(){
  this.location.back()
}

clearForm(){
  this.form = this.fb.group({
    firstName: [''],
    lastName: [''],
    username:[''],
    description:[''],
    stack:[''],
  })
}

}
