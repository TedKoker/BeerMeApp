import { Component, ElementRef, asNativeElements } from '@angular/core';
import { Button } from 'protractor';
import { resolve } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchDone:boolean = false;
  sizeOfInput: string = ""+window.innerWidth/5+"%";
  sizeOfButton: string =""+(window.innerWidth/5)+"%";
  title = 'BeerMeApp';

  ngOnInit(){
  }

  onWindowCange(){
    if(!this.searchDone){
      this.sizeOfInput=""+window.innerWidth/5+"%";
      this.sizeOfButton =""+(window.innerWidth/5)+"%";
    }
    else{
      this.sizeOfInput=""+(window.innerWidth/8.8)+"%";
      this.sizeOfButton=""+(window.innerWidth/8.8)+"%";
    }
  }

  async searchClicked(){
    this.searchDone=true;
    let i = 5;
    //make the interval async await
    let getSmaller = setInterval(()=>{
      if(i<8.8){
        i+=0.04;
        this.sizeOfInput=""+(window.innerWidth/i)+"%";
        this.sizeOfButton=""+(window.innerWidth/i)+"%";
      }
      else clearInterval(getSmaller);
    },10);
    await this.delay(1000);
    console.log("end");
    //this.sizeOfInput=""+window.innerWidth/8.8+"%";
    //this.sizeOfButton=""+(window.innerWidth/8.8)+"%";
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
