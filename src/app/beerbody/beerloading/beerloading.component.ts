import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beerloading',
  templateUrl: './beerloading.component.html',
  styleUrls: ['./beerloading.component.scss']
})
export class BeerloadingComponent{

  loadingText : string = "We're cheking beers for you";
  constructor() {
   }
  ngOnInit() {
    setInterval(()=>{
      if(this.loadingText=="We're cheking beers for you...."){
        this.loadingText="We're cheking beers for you";
      }
      else this.loadingText+=".";
    },300);
  }

}
