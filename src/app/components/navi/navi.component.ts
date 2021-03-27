import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUserId:number;
  user:UserModel;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getUserDetail();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  getUserDetail(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.user = response.data;
    });
  }

  logOut(){
    this.localStorageService.clear();
    this.router.navigate(["/cars"])
  }
}
