import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrantypeComponent } from './trantype.component';

describe('TrantypeComponent', () => {
  let component: TrantypeComponent;
  let fixture: ComponentFixture<TrantypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrantypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
