import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuneinComponent } from './tunein.component';

describe('TuneinComponent', () => {
  let component: TuneinComponent;
  let fixture: ComponentFixture<TuneinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuneinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuneinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
