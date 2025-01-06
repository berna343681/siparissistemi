import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService} from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,AfterViewInit{
 
  users: User[]=[];
  displayedColumns: string[] = ['userId', 'fullName', 'email', 'mobilePhones', 'address', 'notes', 'gender', 'password', 'status', 'refreshToken'];
  dataLoaded = false;
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
  private toastrService:ToastrService,
  private userService:UserService) {}

  ngOnInit(): void {

    this.getUsers();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
 getUsers() {
    this.userService.getUsers().subscribe(
      response => {
        console.log('Response Data:', response); 
        this.users = response; 
        this.dataSource.data = this.users; //// A
        this.dataLoaded = true;
      },
      error => {
        console.error('Error:', error);
        this.toastrService.error('Veri yüklenemedi.');
      }
    );
  }
}