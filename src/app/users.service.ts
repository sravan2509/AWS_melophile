import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

    constructor(private http:HttpClient) {}

    getUsers() {
        return this.http.get('https://melophile-app.herokuapp.com/users');
    }
    addUsers(firstName: string, lastName: string, email:  string, phoneNumber: string,)
    {
        this.http.post('https://melophile-app.herokuapp.com/users',{ firstName, lastName, email, phoneNumber})
        .subscribe((responseData) => {
            console.log(responseData);
        });
    }
    deleteUser(userId: string) {
        this.http.delete("https://melophile-app.herokuapp.com/users/" + userId)
            .subscribe(() => {
                console.log('Deleted: ' + userId);
            });
            // location.reload();
    }
    updateUser(userId: string,firstName: string, lastName: string, email:  string, phoneNumber: string)
    {
        this.http.put("https://melophile-app.herokuapp.com/users/" +
        userId,{ firstName, lastName, email, phoneNumber })
        .subscribe(() => {
            console.log('Updated: ' + userId);
        });
    }
    getUser(userId: string) {
        return this.http.get('https://melophile-app.herokuapp.com/users/'+ userId);
      }


      getReviews() {
        return this.http.get('https://melophile-app.herokuapp.com/reviews');
    }
    addReviews(firstName: string, rate: string, review:  string)
    {
        this.http.post('https://melophile-app.herokuapp.com/reviews',{ firstName, rate, review})
        .subscribe((responseData) => {
            console.log(responseData);
        });
    }
    deleteReview(reviewId: string) {
        this.http.delete("https://melophile-app.herokuapp.com/reviews/" + reviewId)
            .subscribe(() => {
                console.log('Deleted: ' + reviewId);
            });
            location.reload();
    }
    updateReview(reviewId: string,firstName: string, rate: string, review: string)
    {
        this.http.put("https://melophile-app.herokuapp.com/reviews/" +
        reviewId,{ firstName, rate, review })
        .subscribe(() => {
            console.log('Updated: ' + reviewId);
        });
    }
    getReview(reviewId: string) {
        return this.http.get('https://melophile-app.herokuapp.com/reviews/'+ reviewId);
      }


      getSubscriptions() {
        return this.http.get('https://melophile-app.herokuapp.com/subscription');
    }
    addSubscription(subtype:string){
        console.log(subtype)
        return this.http.post('https://melophile-app.herokuapp.com/subscription',{subscribed:subtype})

    }
    deleteSubscription(collection:{}){
        return this.http.post('https://melophile-app.herokuapp.com/deleteSubscription',{query:collection})
    }
    updateSubscription(collection:{},value:string){
        return this.http.post('https://melophile-app.herokuapp.com/updateSubscription',{query:collection,subscribed:value})
    }



}
