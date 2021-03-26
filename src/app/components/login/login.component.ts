import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.localStorageService.add("token",response.data.token);
        this.toastrService.success(response.message,"Başarılı");
        this.router.navigate(["/cars"])
      },responseError => {
        if (responseError.error.length>0 && responseError.error) {
          this.toastrService.error(responseError.error,"Hata")
        }
      })
    }else{
      this.toastrService.error("Lütfen formu doldurunuz","Hata")
    }
  }

}
