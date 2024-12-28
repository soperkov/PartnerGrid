import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListModalComponent } from './policy-list-modal.component';

describe('PolicyListModalComponent', () => {
  let component: PolicyListModalComponent;
  let fixture: ComponentFixture<PolicyListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyListModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
