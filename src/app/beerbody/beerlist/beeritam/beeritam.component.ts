import { Component, OnInit, Input } from '@angular/core';
import { BeerDate } from 'src/app/models/beerData';

@Component({
  selector: 'app-beeritam',
  templateUrl: './beeritam.component.html',
  styleUrls: ['./beeritam.component.scss']
})
export class BeeritamComponent {

  @Input() beerData : BeerDate;

  constructor() { }

  ngOnInit() {
  }

}
