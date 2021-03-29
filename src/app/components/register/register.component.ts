import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response => {
        this.localStorageService.delete("token");
        this.localStorageService.add("token",response.data.token);
        this.toastrService.success(response.message,"Başarılı")
        this.router.navigate(["/cars"])
        setTimeout(function () {
          location.reload();
        });
      },responseError => {
        this.toastrService.error(responseError.error,"Hata")
      })
    }else{
      this.toastrService.error("Lütfen formu eksiksiz doldurunuz","Hata")
    }
  }

}
