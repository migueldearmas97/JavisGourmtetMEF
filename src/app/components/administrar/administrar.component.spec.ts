import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarComponent } from './administrar.component';

describe('AdministrarComponent', () => {
  let component: AdministrarComponent;
  let fixture: ComponentFixture<AdministrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
