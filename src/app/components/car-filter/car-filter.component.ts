import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand[];
  colors:Color[];
  currentBrand:number;
  currentColor:number;

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
    })
  }

  getCurrentBrand(brand:Brand){
    if(brand.id == this.currentBrand){
      return true;
    }else{
      return false;
    }
    //this.currentBrand=brand.id;
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
    })
  }

  getCurrentColor(color:Color){
    if(color.id == this.currentColor){
      return true;
    }else{
      return false;
    }
    //this.currentColor=color.id;
  }

  IsCurrentColorNull(){
    if(this.currentColor){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentBrandNull(){
    if(this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  GetRouterLink(){
    if(this.currentColor && this.currentBrand){
      return "/cars/filter/brand/"+this.currentBrand +"/color/" +this.currentColor;
    }else if(this.currentBrand){
      return "/cars/filter/brand/" +this.currentBrand;
    }else if(this.currentColor){
      return "/cars/filter/color/" +this.currentColor;
    }else{
      return "/cars";
    }
  }
}
