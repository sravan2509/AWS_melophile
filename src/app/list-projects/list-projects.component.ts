import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  public users: any;
  constructor(private _myService: UsersService) { }
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
}



}
