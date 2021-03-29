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
import { UserService } from 'src/app/services/userService/user.service';
import { AuthService } from 'src/app/services/authService/auth.service';

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
   returnDate:new Date()     
  };
  dataLoaded=false;
  rentDate:Date;
  returnDate:Date;
  customerId:number;
  rentable:boolean;
  userFindex:number;
  firstDateSelected:boolean= false;

  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private router:Router,
    private datePipe:DatePipe,
    private toastr:ToastrService,
    private userService:UserService,
    private authService:AuthService
    ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        this.CheckStatus(params["carId"])
        this.getCustomers();
        this.getRentalsByCarId(params["carId"])
        this.getUserFindex();
      }
    })
    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");  
  }

   getRentals(){
     this.rentalService.getRentals().subscribe(response => {
      this.rentals=response.data;
      this.dataLoaded=true;
    })
    
  }

  getRentalsByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response => {
      if (response.data[response.data.length-1]) {
        this.rental = response.data[response.data.length-1];
      }
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
    let RentalModel ={
      customerId:this.customerId,
      carId:this.car.carId,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    };
    this.router.navigate(["cars/rental/payment/",JSON.stringify(RentalModel)]);
    this.toastr.success("Ödeme sayfasına yönlendiriliyorsunuz.","Kiralama başarılı");
  }

  CheckStatus(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.rentable = response.data[response.data.length-1].status;
    })
  }

  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }

  setCustomerId(customerId:string){
    this.customerId = +customerId
    console.log(this.customerId)
  }

  calculatePrice(){
    if (this.returnDate) {
      let returnDate = new Date(this.returnDate.toString())
      let rentDate = new Date(this.rentDate.toString())

      let returnDay = Number.parseInt(returnDate.getDate().toString())
      let rentDay = Number.parseInt(rentDate.getDate().toString())

      let returnMonth = Number.parseInt(returnDate.getMonth().toString())
      let rentMonth = Number.parseInt(rentDate.getMonth().toString())

      let returnYear = Number.parseInt(returnDate.getFullYear().toString())
      let rentYear = Number.parseInt(rentDate.getFullYear().toString())

      let result = ((returnDay-rentDay) + ((returnMonth-rentMonth) * 30) + ((returnYear-rentYear) * 365) + 1 ) * this.car.dailyPrice
      
      if (result > 0) {
        return result;
      }
      this.toastr.info("Bu tarihler arasında arabayı kiralayamazsınız","Geçersiz tarih seçimi")
      return 0
      
    }else{
      return this.car.dailyPrice;
    }
  }

  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
  }

  getUserFindex(){
    this.userService.getUserFindexByUserId(this.authService.getUserId()).subscribe(response => {
      this.userFindex = response.data.findex;
    })
  }
}
