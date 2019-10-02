import { Component, ElementRef, ViewChild} from '@angular/core';
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
  backToStart: boolean = false;
  lengthWarning: boolean = false;
  searchInput: string="";
  sizeOfInput: string = ""+window.innerWidth/5+"%";
  sizeOfButton: string =""+(window.innerWidth/5)+"%";
  pages: number[];

  ngOnInit(){
    this.beerService.searchEvent.subscribe(({beerlist: beerArray,message: msg})=>{
        this.pages=this.beerService.getPagesNumber();
    });
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
    this.backToStart=false;
    this.searchDone=true;
    if(!this.showBeerBody){
      let i = 5;
      let getSmaller = setInterval(()=>{
        if(i<(5+(window.innerWidth/320)-1)){
          i+=0.04;
          this.sizeOfInput=""+(window.innerWidth/i)+"%";
          this.sizeOfButton=""+(window.innerWidth/i)+"%";
        }
        else clearInterval(getSmaller);
      },1000/(window.innerWidth/(5+(window.innerWidth/320)-1))/10);
      await this.delay(1100);
  }
    this.beerService.searchBeer(this.searchInput);
    this.showBeerBody = true;
  }

  async startPoint(){
    this.backToStart=true;
    this.showBeerBody=false;
    this.searchDone=false;
    let i = (5+(window.innerWidth/320)-1);
    let getSmaller = setInterval(()=>{
        if(i>5){
          i-=0.04;
          this.sizeOfInput=""+(window.innerWidth/i)+"%";
          this.sizeOfButton=""+(window.innerWidth/i)+"%";
        }
        else clearInterval(getSmaller);
      },1000/(window.innerWidth/(5+(window.innerWidth/320)-1))/10);
    let eraseInput = setInterval(()=>{
      //console.log(this.searchInput.split('').sp
      if(this.searchInput.length>0){
        this.searchInput=this.searchInput.split('').splice(0,this.searchInput.length-1).join('');
      }
      else{
        clearInterval(eraseInput);
      }
    },this.searchInput.length<=10 ? 100 : 1000/this.searchInput.length)
    await this.delay(1100);
    this.sizeOfInput=""+window.innerWidth/5+"%";
    this.sizeOfButton =""+(window.innerWidth/5)+"%";
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  checkText(){
    if(this.searchInput.length==35){
     
      this.lengthWarning=true;
    }
    else{
      this.lengthWarning=false;
    }
  }

  maxLength(){

  }
}

