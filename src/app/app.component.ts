import { Component} from '@angular/core';
import { BeerService } from './sevices/beerService';
import { AutoComplete } from './models/autoComplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  divider: number = 4+(window.innerWidth-320)/1200; //old divider = 5
  /**
   * Explantion about the formula:
   * 4 = is the minimum number that the divider should be (in 320 px screen)
   * window.innerWidth-320 = calculating the difference between the current window, and the smallest window (320 px screen)
   * 1200 = for each defference of 1200 px the divider should grow in 1.
   */
  searchDone:boolean = false;
  showBeerBody: boolean = false;
  backToStart: boolean = false;
  warning: boolean = false;
  searchInput: string="";
  sizeOfInput: string = ""+window.innerWidth/this.divider+"%";
  sizeOfButton: string =""+(window.innerWidth/this.divider)+"%";
  sizeOfAutocomplete: string=""+(window.innerWidth/this.divider/2)+"%";
  pages: number[];
  autoCompletes: AutoComplete[];

  

  ngOnInit(){
    this.beerService.searchEvent.subscribe(({beerlist: beerArray,message: msg})=>{
        this.pages=this.beerService.getPagesNumber();
    });
    this.beerService.autoCompleteEvent.subscribe(()=>{
      this.autoCompletes=this.beerService.getAutoComplete();
    });
  }

  constructor(private beerService: BeerService){}

  onWindowCange(){
    this.divider = 4+(window.innerWidth-320)/1200;
    this.sizeOfAutocomplete=""+(window.innerWidth/this.divider)+"%";
    if(!this.searchDone){
      this.sizeOfInput=""+window.innerWidth/this.divider+"%";
      this.sizeOfButton =""+(window.innerWidth/this.divider)+"%";
      this.sizeOfAutocomplete=""+(window.innerWidth/this.divider)+"%";
    }
    else{
      this.sizeOfInput=""+(window.innerWidth/(this.divider+(window.innerWidth/320)-1))+"%";
      this.sizeOfButton=""+(window.innerWidth/(this.divider+(window.innerWidth/320)-1))+"%";
    }
  }

  async searchClicked(){
    this.autoCompletes=[];
    if(this.searchInput==""){
      this.warning=true;
      return;
    }
    this.backToStart=false;
    this.searchDone=true;
    if(!this.showBeerBody){
      let i = this.divider;
      let getSmaller = setInterval(()=>{
        if(i<(this.divider+(window.innerWidth/320)-1)){
          i+=0.04;
          this.sizeOfInput=""+(window.innerWidth/i)+"%";
          this.sizeOfButton=""+(window.innerWidth/i)+"%";
        }
        else clearInterval(getSmaller);
      },1000/(window.innerWidth/(this.divider+(window.innerWidth/320)-1))/10);
      await this.delay(1100);
  }
    this.beerService.searchBeer(this.searchInput);
    this.showBeerBody = true;
  }

  async startPoint(){
    this.backToStart=true;
    this.showBeerBody=false;
    this.searchDone=false;
    let i = (this.divider+(window.innerWidth/320)-1);
    let getSmaller = setInterval(()=>{
        if(i>this.divider){
          i-=0.04;
          this.sizeOfInput=""+(window.innerWidth/i)+"%";
          this.sizeOfButton=""+(window.innerWidth/i)+"%";
        }
        else clearInterval(getSmaller);
      },1000/(window.innerWidth/(this.divider+(window.innerWidth/320)-1))/10);
    let eraseInput = setInterval(()=>{
      if(this.searchInput.length>0){
        this.searchInput=this.searchInput.split('').splice(0,this.searchInput.length-1).join('');
      }
      else{
        clearInterval(eraseInput);
      }
    },this.searchInput.length<=10 ? 100 : 1000/this.searchInput.length)
    await this.delay(1100);
    this.sizeOfInput=""+window.innerWidth/this.divider+"%";
    this.sizeOfButton =""+(window.innerWidth/this.divider)+"%";
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  checkText(){
    if(this.searchInput.length==35){
      this.warning=true;
    }
    else{
      this.warning=false;
    }
    this.beerService.searchAutoComplete(this.searchInput);
  }

  maxLength(){

  }
}

