import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliproinfoComponent } from './aliproinfo.component';

describe('AliproinfoComponent', () => {
  let component: AliproinfoComponent;
  let fixture: ComponentFixture<AliproinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliproinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliproinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
