import { Component, OnInit } from '@angular/core';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contactus',
  templateUrl: './redeemRewards.component.html',
  styleUrls: ['./redeemRewards.component.css']
})
export class RedeemRewardsComponent implements OnInit {
  storeIcon=faStore;
  emojiIcon=faSmile;
  constructor() { }
  ngOnInit(): void {
  }
}
