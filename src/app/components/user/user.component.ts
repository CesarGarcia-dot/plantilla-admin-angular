import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { UsersDataSource } from 'src/app/interfaces/userdatasource';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit, OnInit {

  users: User[]; 

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(); // create new object
    this.showUsers();
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
  }


  showUsers() {
    return this._userService.getUsers2()
      .subscribe((data) => {
        console.log(data);
         this.dataSource.data = data;
      }, (error) => console.log(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
