import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelServiceComponent } from './hostel-service.component';

describe('HostelServiceComponent', () => {
  let component: HostelServiceComponent;
  let fixture: ComponentFixture<HostelServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
