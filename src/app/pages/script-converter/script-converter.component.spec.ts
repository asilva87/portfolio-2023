import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptConverterComponent } from './script-converter.component';

describe('ScriptConverterComponent', () => {
  let component: ScriptConverterComponent;
  let fixture: ComponentFixture<ScriptConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
