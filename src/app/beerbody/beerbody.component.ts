import { Component, OnInit } from '@angular/core';
import { BeerDate } from '../models/beerData';
import { BeerService } from '../sevices/beerService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-beerbody',
  templateUrl: './beerbody.component.html',
  styleUrls: ['./beerbody.component.scss']
})
export class BeerbodyComponent implements OnInit {

  beerDataList : BeerDate[]=null;
  beerSub: Subscription;
  constructor(private beerService: BeerService) { }

  isConnected() : boolean{
    if(this.beerDataList!=null){
      //this.beerDataList=this.beerService.getBeerDataList();
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit() {
    this.beerSub = this.beerService.searchEvent.subscribe( ({beerlist: beerArray,message: msg}) =>{
      if(msg=="enter"){
        console.log(msg);
        this.beerDataList=null;
      }
      else{
        console.log(msg);
        this.beerDataList=beerArray;
      }
    });
  }

  ngOnDestyoy(){
    if(this.beerSub){
      this.beerSub.unsubscribe();
    }
  }

}
