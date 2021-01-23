import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliproComponent } from './alipro.component';

describe('AliproComponent', () => {
  let component: AliproComponent;
  let fixture: ComponentFixture<AliproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AliproComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
