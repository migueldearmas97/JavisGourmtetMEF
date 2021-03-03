import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAComponent } from './menu-a.component';

describe('MenuAComponent', () => {
  let component: MenuAComponent;
  let fixture: ComponentFixture<MenuAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
