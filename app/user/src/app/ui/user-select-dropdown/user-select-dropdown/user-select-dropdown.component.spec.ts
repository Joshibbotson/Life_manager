import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectDropdownComponent } from './user-select-dropdown.component';

describe('UserSelectDropdownComponent', () => {
  let component: UserSelectDropdownComponent;
  let fixture: ComponentFixture<UserSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
