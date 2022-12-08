import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() firstName: string = "";
  @Input() rate: string = "";
  @Input() review:  string = "";
  public mode = 'Add'; 
  private id: any;
  public rev: any;
  public users: any;
  constructor(private _myService: UsersService, private router:Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.getReviews();
    this.getUsers();
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id')){
            this.mode = 'Edit'; 
            this.id = paramMap.get('_id');

            this._myService.getReview(this.id).subscribe(
                data => { 
                    this.rev = data;
                    this.firstName = this.rev.firstName;
                    this.rate = this.rev.rate;
                    this.review= this.rev.review;
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
feedbackForm = new UntypedFormGroup(
  {
  firstName: new UntypedFormControl(''),
  rate: new UntypedFormControl(''),
  review: new UntypedFormControl(''),
});
onSubmit() {
  console.log("You submitted: " + this.firstName);
  if (this.mode == 'Add')
  this._myService.addReviews(this.firstName ,this.rate, this.review);
  if (this.mode == 'Edit')
  this._myService.updateReview(this.id,this.firstName ,this.rate, this.review);
  //this.router.navigate(['/listUsers']);
  this.router.navigate(['/listReviews'])
  .then(() => {
    window.location.reload();
  });
}

getReviews() {
  this._myService.getReviews().subscribe(
      data => { this.rev = data},
      err => console.error(err),
      () => console.log('finished loading')
  );
}
onDelete(reviewId: string) {
this._myService.deleteReview(reviewId);
}

getUsers() {
  this._myService.getUsers().subscribe(
      data => { this.users = data},
      err => console.error(err),
      () => console.log('finished loading')
  );
}

loginForm = new UntypedFormGroup(
{
  userName: new UntypedFormControl(''),
  phoneNumber: new UntypedFormControl('')
});

}