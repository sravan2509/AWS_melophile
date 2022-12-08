import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() email:  string = "";
  @Input() phoneNumber:  string = "";
  public mode = 'Add'; 
  private id: any;
  private user: any;
  constructor(private _myService: UsersService, private router:Router, public route: ActivatedRoute) { }

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

  registrationForm = new UntypedFormGroup(
    {
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phoneNumber: new UntypedFormControl(''),
  });
  onSubmit() {
    console.log("You submitted: " + this.firstName + " " + this.lastName);
    if (this.mode == 'Add')
    this._myService.addUsers(this.firstName ,this.lastName, this.email, this.phoneNumber);
    if (this.mode == 'Edit')
    this._myService.updateUser(this.id,this.firstName ,this.lastName, this.email, this.phoneNumber);
    //this.router.navigate(['/listUsers']);
    this.router.navigate(['/getMyProfile'])
    .then(() => {
      window.location.reload();
    });

  }
  
  loginForm = new UntypedFormGroup(
  {
    userName: new UntypedFormControl(''),
    phoneNumber: new UntypedFormControl('')
  });

}
