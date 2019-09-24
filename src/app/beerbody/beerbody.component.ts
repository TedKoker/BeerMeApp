import { Component, OnInit } from '@angular/core';
import { BeerDate } from '../models/beerData';
import { BeerService } from '../sevices/beerService';

@Component({
  selector: 'app-beerbody',
  templateUrl: './beerbody.component.html',
  styleUrls: ['./beerbody.component.scss']
})
export class BeerbodyComponent implements OnInit {

  beerDataList : BeerDate[];
  test: string = "ss";

  constructor(private beerService: BeerService) { }

  isConnected() : boolean{
    if(this.beerService.getBeerDataList()!=null){
      this.beerDataList=this.beerService.getBeerDataList();
      this.test= this.beerDataList[0].name;
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit() {
  }

}
