import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages:CarImage[];
  car:Car;
  detaLoaded=false;
  apiUrl = "https://localhost:44373/images/";


  constructor(private activatedRoute:ActivatedRoute,private carImageService:CarImageService,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetails(params["carId"])
        this.getCarImagesByCarId(params["carId"])
      }
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages=response.data;
      this.detaLoaded=true;
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car=response.data[0];
      this.detaLoaded=true;
    })
  }

  getCurrentImageClass(image:CarImage){
    if (image == this.carImages[0]) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if (image == this.carImages[0]) {
      return "active"
    } else {
      return ""
    }
  }
}
