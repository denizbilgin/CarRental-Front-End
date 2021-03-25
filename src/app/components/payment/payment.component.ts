import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardNumber:string;
  firstName:string;
  lastName:string;
  cVV:number;
  expirationDate:string;
  rental:Rental;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
      }
    })
  }

  addRental(){
    let newPayment:Payment = {
      cardNumber : this.cardNumber,
      expirationDate : this.expirationDate,
      cVV : +this.cVV,
      firstName:this.firstName,
      lastName : this.lastName
    }
    console.log(newPayment)
    console.log(this.rental)
    this.paymentService.addPayment(newPayment);
    this.rentalService.addRental(this.rental);
    this.router.navigate(["cars/"])
  }
}
