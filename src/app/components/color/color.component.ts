import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[];
  dataLoaded=false;
  currentColor:Color;
  filterText="";

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }

  getCurrentColor(color:Color){
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item myactive";
    }else{
      return "list-group-item";
    }
  }

  getAllColorClass(){
    if(!this.currentColor || this.currentColor.id==0){
      return "list-group-item myactive"
    }else{
      return "list-group-item"
    }
  }

  clearCurrentColor(){
    this.currentColor={colorName:"",id:0}
  }
}
