import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCrudComponent } from './view-crud.component';

describe('ViewCrudComponent', () => {
  let component: ViewCrudComponent;
  let fixture: ComponentFixture<ViewCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
