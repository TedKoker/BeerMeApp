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
  headerTwo: string;
  headerFour: string;
  headerFive: string;
  headerSix: string;

  constructor(private beerServoce : BeerService) { }

  ngOnInit() {
    this.initSize();
  }

  initSize(){
    this.headerTwo=""+(window.innerWidth/(3+(window.innerWidth/320)-1))+"%";
    this.headerFour=""+(window.innerWidth/(4+(window.innerWidth/320)-1))+"%";
    this.headerFive=""+(window.innerWidth/(5+(window.innerWidth/320)-1))+"%";
    this.headerSix=""+(window.innerWidth/(6+(window.innerWidth/320)-1))+"%";
  }

  doOnClick(){
    this.beerServoce.hide(this.beerData);
  }

}
