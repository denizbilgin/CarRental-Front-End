import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { CardDetailService } from 'src/app/services/cardDetailService/card-detail.service';
import { UserService } from 'src/app/services/userService/user.service';
import { CardModel } from 'src/app/models/cardModel';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentalAddForm:FormGroup
  rental:Rental;
  isChecked = false;
  cards:CardModel[];
  currentCard:CardModel;
  paymentModel:Payment;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private cardDetailService:CardDetailService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
        this.createRentalAddForm();
        this.getCardsByUserId();
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
    if (this.rentalAddForm.valid || this.currentCard) {
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
    if (this.currentCard) {
       this.paymentModel = Object.assign({},this.currentCard)
    }
    else{
       this.paymentModel = Object.assign({},this.rentalAddForm.value)
    }
    this.paymentService.checkPayment(this.paymentModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        this.addRental();
        this.updateUserFindex();
    },responseError => {
      this.toastrService.error(responseError.error.message,"Hata");
    })
  }
  
  updateUserFindex(){
    this.userService.updateUserFindex(this.authService.getUserId()).subscribe(response => {
      this.toastrService.info(response.message,"Bilgi")
    })
  }

  getCardsByUserId(){
    this.cardDetailService.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.cards = response.data;
    })
  }

  setCurrentCard(card:CardModel){
    this.currentCard = card;
    console.log(this.currentCard)
  }
}
