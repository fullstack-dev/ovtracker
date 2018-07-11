import { Component } from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {

  constructor(private auth: AuthService) { }

}
