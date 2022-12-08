import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
   title = 'Subscription App'
   public subscriptions: any;
   subscribed = '';
  constructor(private _myService: UsersService) { }

  ngOnInit() {
    this.subscriptions = [];
    this.subscribed = '';
    this.getSubscriptions();
  }
  

  mysubscription = "";
  condition = true;
  profileForm = new UntypedFormGroup({
    plan : new UntypedFormControl('',Validators.required)
});

updatePlan() {
  this.profileForm.get('plan')?.setValue('Premium');
  console.log(this.profileForm.get('plan')?.value)
}
onSubmit() {
  // TODO: Use EventEmitter with form value
  this.profileForm.get('plan')?.setValue('Standard');
  console.warn(this.profileForm.value);
  console.log(this.profileForm.get('plan')?.value)
  
}

isSubscribed(){
  return this.subscriptions.length;
}
addSubscription(){
  console.log("Going to add this subscription........................",this.mysubscription)
  this._myService.addSubscription(this.mysubscription).subscribe(
    //read data and assign to public variable students
    data => { 
    console.log("The data returned from table is............................",data)
    },
    err => console.error(err),
    () => console.log('finished loading')
);
this.getSubscriptions();
}
deleteSubscription(){
  console.log("Going to add this subscription........................",this.subscriptions[0])
  this._myService.deleteSubscription(this.subscriptions[0]).subscribe(
    //read data and assign to public variable students
    data => { 
    console.log("The data returned from table is............................",data)
    },
    err => console.error(err),
    () => console.log('finished loading')
);
this.getSubscriptions();
  }
updateSubscription(subtype:string){
  console.log("Going to update this subscription........................",this.subscriptions[0],subtype)
  this._myService.updateSubscription(this.subscriptions[0],subtype).subscribe(
    //read data and assign to public variable students
    data => { 
    console.log("The data returned from table is............................",data)
    this.getSubscriptions();
    },
    err => console.error(err),
    () => console.log('finished loading')
);
}
getSubscriptions(){
  this._myService.getSubscriptions().subscribe(
    //read data and assign to public variable students
    data => { this.subscriptions = data
    console.log("The data returned from table is............................",this.subscriptions)
    this.subscribed = "";
    if(this.subscriptions.length>0){
      this.subscribed = this.subscriptions[0].subscribed
    }
    },
    err => console.error(err),
    () => console.log('finished loading')
);
}

}

