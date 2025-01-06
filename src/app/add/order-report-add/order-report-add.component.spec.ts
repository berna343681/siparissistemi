import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportAddComponent } from './order-report-add.component';

describe('OrderReportAddComponent', () => {
  let component: OrderReportAddComponent;
  let fixture: ComponentFixture<OrderReportAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReportAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
