import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { Profile } from '../../data/services/profile';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,SideBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  profileService =inject(Profile)

ngOnInit(){
  console.log('ngOnInit');
  this.profileService.getMe().subscribe(val=>{
    console.log(val);
  })
}
}
