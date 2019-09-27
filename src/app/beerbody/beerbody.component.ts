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
  slideAnima: boolean=false;

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
      if(this.beerDataList!=null){
        this.slideAnima=true;
      }
      setTimeout(()=>{
        this.slideAnima=false;
        if(msg=="enter"){
          this.beerDataList=null;
        }
        else{
          this.beerDataList=beerArray;
        }
      }, 500);
    });
  }

  ngOnDestyoy(){
    if(this.beerSub){
      this.beerSub.unsubscribe();
    }
  }

}
