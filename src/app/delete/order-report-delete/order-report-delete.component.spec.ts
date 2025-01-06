import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportDeleteComponent } from './order-report-delete.component';

describe('OrderReportDeleteComponent', () => {
  let component: OrderReportDeleteComponent;
  let fixture: ComponentFixture<OrderReportDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReportDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
