import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreComponent } from './chore.component';

describe('ChoreComponent', () => {
  let component: ChoreComponent;
  let fixture: ComponentFixture<ChoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoreComponent]
    });
    fixture = TestBed.createComponent(ChoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
