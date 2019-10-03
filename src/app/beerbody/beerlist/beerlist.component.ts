import { Component, OnInit, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BeerService } from 'src/app/sevices/beerService';
import { BeerDate } from 'src/app/models/beerData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.scss']
})
export class BeerlistComponent {
  
  @ViewChild("pageSelector", {static:true}) pageSelector: ElementRef;
  test:ChangeDetectorRef;
  beerDataList: BeerDate[];
  outAnimation: boolean = false;
  twoColPage:boolean=true;
  slideTop:boolean = true;
  toLeftAnima:boolean=false;
  fromRightAnima:boolean=false;
  toRightAnima:boolean=false;
  fromLeftAnima:boolean=false;
  fadeOutAnima:boolean=false;
  fadeInAnima:boolean=false;
  pages: number[];
  searchEvent: Subscription;

  constructor(private beerService: BeerService) {
    
   }

   showMe(){
     console.log(window.innerWidth);
   }

  ngOnInit() {
    this.beerDataList=this.beerService.getBeerDataList();
    this.beerService.hideEvent.subscribe(()=>{
      this.beerDataList=this.beerService.getBeerDataList();
    });
    this.twoColPage=(window.innerWidth>=770);
    this.pages=this.beerService.getPagesNumber();
  }

  ngAfterViewInit() {
    //this.twoColPage=(window.innerWidth>=770);
  }

  updatePar(){
    this.twoColPage=(window.innerWidth>=770);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async changePage(event){
    this.slideTop=false;
    this.fadeOutAnima=true;
    await this.delay(500);
    this.fadeOutAnima=false;
    this.beerDataList=[];
    this.beerDataList=this.beerService.getBeerDataList(event.target.value);
    this.fadeInAnima=true;
    await this.delay(500);
    this.fadeInAnima=false;
  }

  async nextPage(){
    this.slideTop=false;
    this.toLeftAnima=true;
    await this.delay(500);
    this.toLeftAnima=false;
    let page:number = Number(this.pageSelector.nativeElement.value)+1;
    this.pageSelector.nativeElement.value=""+page;
    this.beerDataList=this.beerService.getBeerDataList(page);
    this.fromRightAnima=true;
    await this.delay(500);
    this.fromRightAnima=false;
  }

  async prevPage(){
    /**
     * I need to give attention to this function after production mode is on..
     * It may not work couse of ExpressionChangedAfterItHasBeenCheckedError
     */
    this.slideTop=false;
    this.toRightAnima=true;
    await this.delay(500);
    this.toRightAnima=false;
    let page:number = Number(this.pageSelector.nativeElement.value)-1;
    this.pageSelector.nativeElement.value=""+page;
    this.beerDataList=this.beerService.getBeerDataList(page);
    this.fromLeftAnima=true;
    await this.delay(500);
    this.fromLeftAnima=false;
  }

  nextButtonDisabled() : boolean{
    let disable: boolean;
    if(this.pageSelector!=null && Number(this.pageSelector.nativeElement.value)==this.pages.length){
      disable=true;
    }
    else{
      disable=false;
    }
    return disable;
  }

  prevButtonDisabled(): boolean{
    let disable: boolean;
    if(this.pageSelector!=null && Number(this.pageSelector.nativeElement.value)==1){
      disable=true;
    }
    else{
      disable=false;
    }
    return disable;
  }

  

  ngOnDestroy(){
    if(this.searchEvent){
      this.searchEvent.unsubscribe();
    }
    
  }

}
