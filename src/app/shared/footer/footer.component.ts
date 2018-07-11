import {Component} from '@angular/core';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // Automatically update footer's year
  year = new Date().getFullYear();

  constructor(public auth: AuthService) {
  }

}
