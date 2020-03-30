import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolEdicionComponent } from './rol-edicion.component';

describe('RolEdicionComponent', () => {
  let component: RolEdicionComponent;
  let fixture: ComponentFixture<RolEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
