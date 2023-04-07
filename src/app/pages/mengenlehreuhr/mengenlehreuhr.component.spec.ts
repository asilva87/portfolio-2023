import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MengenlehreuhrComponent } from './mengenlehreuhr.component';

describe('MengenlehreuhrComponent', () => {
  let component: MengenlehreuhrComponent;
  let fixture: ComponentFixture<MengenlehreuhrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MengenlehreuhrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MengenlehreuhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
