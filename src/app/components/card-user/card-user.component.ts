import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {
  // properties
  p: number = 1;
  users: Photo[]; 
  
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.showUsersPhotos();
  }


  showUsersPhotos() {
    return this._userService.getUsersPhotos()
      .subscribe((data) => {
        this.users = data;
      }, (error) => console.log(error));
  }

}
