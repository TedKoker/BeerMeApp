import { Component, OnInit, EventEmitter } from '@angular/core';
import { BeerService } from 'src/app/sevices/beerService';
import { BeerDate } from 'src/app/models/beerData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.scss']
})
export class BeerlistComponent {

  beerDataList: BeerDate[];
  outAnimation: boolean = false;
  searchEvent: Subscription;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerDataList=this.beerService.getBeerDataList();
    this.beerService.hideEvent.subscribe(()=>{
      this.beerDataList=this.beerService.getBeerDataList();
    });
    /*this.searchEvent = this.beerService.searchEvent.subscribe((newBeerList: BeerDate[]) =>{
      setTimeout(()=>{
        console.log("end");
        this.beerDataList=null;
      },100)
      console.log("start");
    });*/
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnDestroy(){
    if(this.searchEvent){
      this.searchEvent.unsubscribe();
    }
    
  }

}
