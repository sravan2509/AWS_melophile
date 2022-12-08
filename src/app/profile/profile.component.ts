import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public users: any;
  constructor(private _myService: UsersService,  private router:Router) { }
  
  ngOnInit() {
      this.getUsers();
  }
  getUsers() {
      this._myService.getUsers().subscribe(
          data => { this.users = data},
          err => console.error(err),
          () => console.log('finished loading')
      );
  }
  onDelete(userId: string) {
    this._myService.deleteUser(userId);
    
    this.router.navigate(['/']);
}

registrationForm = new UntypedFormGroup(
  {
  firstName: new UntypedFormControl(''),
  lastName: new UntypedFormControl(''),
  email: new UntypedFormControl(''),
  phoneNumber: new UntypedFormControl(''),
});
}
