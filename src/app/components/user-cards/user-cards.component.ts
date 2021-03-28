import { Component, OnInit } from '@angular/core';
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
    private cardDetail:CardDetailService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId(){
    this.cardDetail.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.cards = response.data;
    })
  }

}
