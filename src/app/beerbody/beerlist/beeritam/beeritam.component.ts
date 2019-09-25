import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BeerDate } from 'src/app/models/beerData';
import { BeerService } from 'src/app/sevices/beerService';

@Component({
  selector: 'app-beeritam',
  templateUrl: './beeritam.component.html',
  styleUrls: ['./beeritam.component.scss']
})
export class BeeritamComponent {

  @Input() beerData : BeerDate;

  constructor(private beerServoce : BeerService) { }

  ngOnInit() {
  }

  doOnClick(){
    this.beerServoce.hide(this.beerData);
  }

}
