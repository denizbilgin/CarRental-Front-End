import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { CardDetailService } from 'src/app/services/cardDetailService/card-detail.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentalAddForm:FormGroup
  rental:Rental;
  isChecked = false;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private cardDetailService:CardDetailService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
        this.createRentalAddForm();
      }
    })
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cVV:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  CardSave(){
    if (this.isChecked == true) {
      let cardModel = Object.assign({userId:this.authService.getUserId()},this.rentalAddForm.value)
      this.cardDetailService.saveCard(cardModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      });
    }
  }

  addRental(){
    if (this.rentalAddForm.valid) {
      let addRentalModel = Object.assign({},this.rentalAddForm.value)
      this.rentalService.addRental(this.rental).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        this.CardSave();
        this.router.navigate(["cars/"])
      },responseError => {
        this.toastrService.error(responseError.error,"Hata")
      });
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Başarılı")
    }
  }

  checkPayment(){
    let checkPaymentModel = Object.assign({},this.rentalAddForm.value)
    this.paymentService.checkPayment(checkPaymentModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        this.addRental();
    },responseError => {
      this.toastrService.error(responseError.error,"Hata");
    })
  }
}
