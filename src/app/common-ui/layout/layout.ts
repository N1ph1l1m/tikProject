import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { ProfileService } from '../../data/services/profileService';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,SideBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
