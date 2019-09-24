import { Component, OnInit } from '@angular/core';
import { BeerService } from 'src/app/sevices/beerService';
import { BeerDate } from 'src/app/models/beerData';

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
  }

}
