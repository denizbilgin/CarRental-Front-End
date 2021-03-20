import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/carService/car.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { DatePipe } from "@angular/common"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  car:Car;
  minDate:string|null;
  maxDate:string|null;
  customers:Customer[];
  rentals:Rental[]=[];
  rental:Rental = {
    carId:0,
    companyName:"",
    customerId:0,
    firstName:"",
   lastName:"",
   rentDate:new Date(),
   returnDate:new Date(),
   id:0       
  };
  dataLoaded=false;
  rentDate:Date;
  returnDate:Date;
  customerId:number;
  rentable:boolean=false;
  firstDateSelected:boolean= false;

  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private router:Router,
    private datePipe:DatePipe,
    private toastr:ToastrService
    ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        this.getCustomers();
      }
    })
    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
     this.getRentals()    
  }

   getRentals(){
     this.rentalService.getRentals().subscribe(response => {
      this.rentals=response.data;
      this.dataLoaded=true;
    })
    
  }

  getCarDetail(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car=response.data[0];
    })
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers=response.data;
    })
  }

  addRental(){
    if (this.rentals.filter(x => x.carId == this.car.carId && x.returnDate == null).length > 0) {
      this.toastr.error("Bu araç zaten kiralanmış","Kiralama başarısız.")
    }else{
      this.rental.carId = this.car.carId;
      this.rental.rentDate = this.rentDate;
      this.rental.returnDate = this.returnDate;
      //this.rentalService.addRental(this.rental);
      this.toastr.success("Ödeme sayfasına yönlendiriliyorsunuz.","Kiralama başarılı")
    }
  }

  setCustomerId(customerId:any){
   this.rental.customerId=+customerId;
  }

  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }
}
