import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[] = [];
  currentBrand:Brand;
  dataLoaded=false;
  filterText="";

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }

  getCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item myactive"
    }else{
      return "list-group-item"
    }
  }

  getAllBrandClass() {
    if (!this.currentBrand || this.currentBrand.id==0) {
      return 'list-group-item myactive';
    }else if(this.currentBrand.brandName==""){
      return 'list-group-item myactive';
    } 
    else {
      return 'list-group-item';
    }
  }

  clearCurrentBrand(){
    this.currentBrand={brandName:"",id:0};
  }
}
