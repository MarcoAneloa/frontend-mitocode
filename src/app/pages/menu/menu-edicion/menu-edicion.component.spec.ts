import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEdicionComponent } from './menu-edicion.component';

describe('MenuEdicionComponent', () => {
  let component: MenuEdicionComponent;
  let fixture: ComponentFixture<MenuEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
