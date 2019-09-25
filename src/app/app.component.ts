import { Component, ElementRef} from '@angular/core';
import { resolve } from 'q';
import { BeerService } from './sevices/beerService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchDone:boolean = false;
  showBeerBody: boolean = false;
  searchInput: string="";
  sizeOfInput: string = ""+window.innerWidth/5+"%";
  sizeOfButton: string =""+(window.innerWidth/5)+"%";

  ngOnInit(){
  }

  constructor(private beerService: BeerService){}

  onWindowCange(){
    if(!this.searchDone){
      this.sizeOfInput=""+window.innerWidth/5+"%";
      this.sizeOfButton =""+(window.innerWidth/5)+"%";
    }
    else{
      this.sizeOfInput=""+(window.innerWidth/(5+(window.innerWidth/320)-1))+"%";
      this.sizeOfButton=""+(window.innerWidth/(5+(window.innerWidth/320)-1))+"%";
    }
  }

  async searchClicked(){
    this.searchDone=true;
    let i = 5;
    let getSmaller = setInterval(()=>{
      if(i<(5+(window.innerWidth/320)-1)){
        i+=0.04;
        this.sizeOfInput=""+(window.innerWidth/i)+"%";
        this.sizeOfButton=""+(window.innerWidth/i)+"%";
      }
      else clearInterval(getSmaller);
    },10);
    await this.delay(1100);
    this.beerService.searchBeer(this.searchInput);
    this.showBeerBody = true;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
