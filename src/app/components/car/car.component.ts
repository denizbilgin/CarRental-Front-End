import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';
import { tap } from "rxjs/operators" 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[];
  carImages:CarImage;
  apiUrl = "https://localhost:44373/images/";
  carImageDefault="https://localhost:44373/images/default1.jpg"
  currentCarImage:CarImage;
  dataLoaded=false;
  filterText="";
  

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    //subscribe'ın içindeki şeye erişilir.
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"] && params["colorId"]){
        this.getCarByFilter(params["brandId"],params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsImages(){
    this.carImageService.getCarsImages()
  }

  getCarByFilter(brandId:number,colorId:number){
    this.carService.getCarByBrandIdAndColorId(brandId,colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded=true;
      if(this.cars.length == 0){
        this.toastrService.info("Arama sonucunuza ait bir araç bulunamamaktadır.","Arama sonucu")
      }
    })
  }
}
