import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerloadingComponent } from './beerloading.component';

describe('BeerloadingComponent', () => {
  let component: BeerloadingComponent;
  let fixture: ComponentFixture<BeerloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
