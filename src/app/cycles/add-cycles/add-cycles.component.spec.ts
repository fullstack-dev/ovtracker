import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCyclesComponent } from './add-cycles.component';

describe('AddCyclesComponent', () => {
  let component: AddCyclesComponent;
  let fixture: ComponentFixture<AddCyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
