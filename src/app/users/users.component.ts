import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import * as e from 'express';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() email:  string = "";
  @Input() phoneNumber:  string = "";
  public mode = 'Add';
  private id: any;
  private user: any;
  public error_message = "";
  loginUsername = "";
  loginPassword = "";
  public username: string = '';
  public adminLoginUsername = "admin@gmail.com";
  public adminLoginPassword = "admin@1234"

  constructor(private _myService: UsersService, private router:Router, public route: ActivatedRoute) { }



  setUserName (userName : string): void {
    // console.log('setNewUserName', userName)
    this.loginUsername = userName
    console.log(this.loginUsername)

}

setPassword (password : string): void {
  // console.log('setNewUserName', userName)
  this.loginPassword = password
  console.log(this.loginPassword)

}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id')){
            this.mode = 'Edit';
            this.id = paramMap.get('_id');

            this._myService.getUser(this.id).subscribe(
                data => {
                    this.user = data;
                    this.firstName = this.user.firstName;
                    this.lastName = this.user.lastName;
                    this.email= this.user.email;
                    this.phoneNumber = this.user.phoneNumber
                },
                err => console.error(err),
                () => console.log('finished loading')
            );
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}
registrationForm = new FormGroup(
  {
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  phoneNumber: new FormControl('', Validators.required),
});
loginBtnClick ()
{
  // const loginUse = (<HTMLInputElement>document.getElementById("userName")).value;
  if(this.loginUsername == this.adminLoginUsername && this.loginPassword == this.adminLoginPassword)
  {
    // console.log(loginUse);
     this.router.navigate(['/adminPage'])
     .then(() => {
      window.location.reload();
    });
  }
};

onSubmit() {
  console.log("You submitted: " + this.firstName + " " + this.lastName);
  this.error_message = '';

  if (this.mode == 'Add' || this.mode == 'Edit')
  {
    if(this.firstName!='' && this.lastName!='' && this.email!='' && this.phoneNumber!='')
    {
      if (this.mode == 'Add')
        this._myService.addUsers(this.firstName ,this.lastName, this.email, this.phoneNumber);
      if (this.mode == 'Edit')
        this._myService.updateUser(this.id,this.firstName ,this.lastName, this.email, this.phoneNumber);

      this.router.navigate(['/Open'])
      .then(() => {
        window.location.reload();
      });
    }
    else
        this.error_message = "Please give all details to access Tune-In";
  }
  else
  {
    alert('i am called');
  }
}

loginForm = new UntypedFormGroup(
{
  userName: new UntypedFormControl(''),
  password: new UntypedFormControl('')
});



}
