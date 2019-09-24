import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerbodyComponent } from './beerbody.component';

describe('BeerbodyComponent', () => {
  let component: BeerbodyComponent;
  let fixture: ComponentFixture<BeerbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
