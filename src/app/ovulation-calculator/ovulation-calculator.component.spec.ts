import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvulationCalculatorComponent } from './ovulation-calculator.component';

describe('OvulationCalculatorComponent', () => {
  let component: OvulationCalculatorComponent;
  let fixture: ComponentFixture<OvulationCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvulationCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvulationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
