import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardModel } from 'src/app/models/cardModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CardDetailService } from 'src/app/services/cardDetailService/card-detail.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  cards:CardModel[];

  constructor(
    private cardDetailService:CardDetailService,
    private authService:AuthService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId(){
    this.cardDetailService.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.cards = response.data;
    })
  }

  deleteCard(card:CardModel){
    this.cardDetailService.deleteCard(card).subscribe(response => {
      this.toastrService.success(response.message,"Başarılı")
      setTimeout(function () {
        location.reload();
      });
    })
  }

}
