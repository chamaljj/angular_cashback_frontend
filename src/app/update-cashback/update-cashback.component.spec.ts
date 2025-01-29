import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCashbackComponent } from './update-cashback.component';

describe('UpdateCashbackComponent', () => {
  let component: UpdateCashbackComponent;
  let fixture: ComponentFixture<UpdateCashbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCashbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCashbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
