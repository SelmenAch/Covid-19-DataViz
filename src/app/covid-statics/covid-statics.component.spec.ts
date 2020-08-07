import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidStaticsComponent } from './covid-statics.component';

describe('CovidStaticsComponent', () => {
  let component: CovidStaticsComponent;
  let fixture: ComponentFixture<CovidStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
