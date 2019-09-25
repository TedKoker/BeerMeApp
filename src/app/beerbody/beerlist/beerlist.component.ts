import { Component, OnInit, EventEmitter } from '@angular/core';
import { BeerService } from 'src/app/sevices/beerService';
import { BeerDate } from 'src/app/models/beerData';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.scss']
})
export class BeerlistComponent {

  beerDataList: BeerDate[];

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerDataList=this.beerService.getBeerDataList();
    this.beerService.hideEvent.subscribe(()=>{
      this.beerDataList=this.beerService.getBeerDataList();
    });
  }

}
