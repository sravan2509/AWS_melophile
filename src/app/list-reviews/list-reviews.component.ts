import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  @Input() firstName: string = "";
  @Input() rate: string = "";
  @Input() review:  string = "";
  feedbackForm = new UntypedFormGroup(
    {
    firstName: new UntypedFormControl(''),
    rate: new UntypedFormControl(''),
    review: new UntypedFormControl(''),
  });
  public mode = 'Add'; 
  private id: any;
  public rev: any;
  public users: any;
  public is_current_user = false;
  constructor(private _myService: UsersService , private router:Router) { }
  ngOnInit() {
      this.getReviews();
      this.getUsers();
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
  onSubmit() {
    console.log("You submitted: " + this.firstName);
    if (this.mode == 'Add')
    this._myService.addReviews(this.firstName ,this.rate, this.review);
    if (this.mode == 'Edit')
    this._myService.updateReview(this.id,this.firstName ,this.rate, this.review);
    //this.router.navigate(['/listUsers']);
    this.router.navigate(['/Open'])
    .then(() => {
      window.location.reload();
    });
  }
   
}
