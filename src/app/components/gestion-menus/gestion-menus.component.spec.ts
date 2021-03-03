import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMenusComponent } from './gestion-menus.component';

describe('GestionMenusComponent', () => {
  let component: GestionMenusComponent;
  let fixture: ComponentFixture<GestionMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
