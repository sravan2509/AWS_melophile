import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuserreviewsComponent } from './listuserreviews.component';

describe('ListuserreviewsComponent', () => {
  let component: ListuserreviewsComponent;
  let fixture: ComponentFixture<ListuserreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListuserreviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListuserreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
