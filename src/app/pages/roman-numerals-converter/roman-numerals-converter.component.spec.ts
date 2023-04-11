import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomanNumeralsConverterComponent } from './roman-numerals-converter.component';

describe('RomanNumeralsConverterComponent', () => {
  let component: RomanNumeralsConverterComponent;
  let fixture: ComponentFixture<RomanNumeralsConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomanNumeralsConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomanNumeralsConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
