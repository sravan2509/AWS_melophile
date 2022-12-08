import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { TuneinComponent } from './tunein/tunein.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UsereditComponent } from './useredit/useredit.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import {MusicplaylistService} from "../app/musicplaylist.service";
import { ListuserreviewsComponent } from './listuserreviews/listuserreviews.component';
import { AdminpageComponent } from './adminpage/adminpage.component';

const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: UsersComponent
},{
  path: 'Open',
  component: TuneinComponent
},{
  path: 'listUsers',
  component: ListProjectsComponent
}, {
  path: 'editUser/:_id',
  component: UsereditComponent
},
{
  path: 'subscriptions',
  component: SubscriptionPlanComponent
},
{
  path: 'reviews',
  component: ReviewsComponent
},
{
  path: 'listReviews',
  component: ListReviewsComponent
},
{
  path: 'editReview/:_id',
  component: ReviewsComponent
},
{
  path: 'playlists',
  component: PlaylistsComponent
},
{
  path: 'myProfile',
  component: ListProjectsComponent
},
{
  path: 'getMyProfile',
  component: ProfileComponent
},
{
  path: 'listUserReviews',
  component: ListuserreviewsComponent
},
{
  path: 'adminPage',
  component: AdminpageComponent
},

{
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    ListProjectsComponent,
    NotFoundComponent,
    UsersComponent,
    TuneinComponent,
    PlaylistsComponent,
    ReviewsComponent,
    UsereditComponent,
    ProfileComponent,
    SubscriptionPlanComponent,
    ListReviewsComponent,
    ListuserreviewsComponent,
    AdminpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UsersService,MusicplaylistService],
  bootstrap: [AppComponent]

})
export class AppModule { }
