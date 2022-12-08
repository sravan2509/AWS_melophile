import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT6203';
  condition = false;
  display_profile_block = 'display: block;';

  constructor(private router: Router, private location: Location) {
    if(this.location.path() == '')
      this.display_profile_block  = 'display: none;';
  }

}
