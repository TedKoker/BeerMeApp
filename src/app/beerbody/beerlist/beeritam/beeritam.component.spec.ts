import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeeritamComponent } from './beeritam.component';

describe('BeeritamComponent', () => {
  let component: BeeritamComponent;
  let fixture: ComponentFixture<BeeritamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeeritamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeeritamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
