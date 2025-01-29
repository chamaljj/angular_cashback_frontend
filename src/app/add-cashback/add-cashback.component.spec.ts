import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashbackComponent } from './add-cashback.component';

describe('AddCashbackComponent', () => {
  let component: AddCashbackComponent;
  let fixture: ComponentFixture<AddCashbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCashbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCashbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
