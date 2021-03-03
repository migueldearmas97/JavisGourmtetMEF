import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRoutesComponent } from './auth-routes.component';

describe('AuthRoutesComponent', () => {
  let component: AuthRoutesComponent;
  let fixture: ComponentFixture<AuthRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
