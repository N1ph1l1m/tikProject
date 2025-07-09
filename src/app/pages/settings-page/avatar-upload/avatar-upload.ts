
import { Component, inject, signal } from '@angular/core';
import { SvgIcon } from '../../../common-ui/svg-icon/svg-icon';
import { Dnd } from '../../../common-ui/directives/dnd';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profileService';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIcon,Dnd,FormsModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {

profileService = inject(ProfileService)
me = this.profileService.me()
preview = signal<string>( "assets/img/defaultAvatar.png")

avatar  :File | null = null

fileBrowserHandler(event:Event){
  const file  = (event.target as HTMLInputElement)?.files?.[0]
  this.processFile(file)

}

onFileDroped(file:File){
  this.processFile(file)
}




processFile(file:File | null | undefined ){
if(!file || !file.type.match('image')) return



const reader =  new FileReader()
reader.onload = event =>{
this.preview.set(event.target?.result?.toString() ?? '')
}
reader.readAsDataURL(file)
this.avatar = file
}


}
