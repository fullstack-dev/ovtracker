import {Component} from '@angular/core';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isActive = false;

  constructor(private auth: AuthService) {
  }

  toggleActive() {
    this.isActive = !this.isActive
  }

  setActive(state: boolean) {
    this.isActive = state
  }
}
