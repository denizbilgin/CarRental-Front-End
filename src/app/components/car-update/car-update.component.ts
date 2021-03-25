import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  car:Car
  brands:Brand[];
  colors:Color[];
  carId:number;
  carImages:CarImage[];
  apiUrl = "https://localhost:44373/images/";
  carImageDefault="https://localhost:44373/images/default1.jpg"

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private carImageService:CarImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carId = parseInt(params["carId"])
        this.getCarDetails(this.carId)
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:[this.carId],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  update(){
    console.log(this.carUpdateForm)
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(carModel.id)
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri hatalı","Hata")
    }
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car = response.data[0];
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
    })
  }
}
