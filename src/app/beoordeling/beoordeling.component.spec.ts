import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeoordelingComponent } from './beoordeling.component';

describe('BeoordelingComponent', () => {
  let component: BeoordelingComponent;
  let fixture: ComponentFixture<BeoordelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeoordelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeoordelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
