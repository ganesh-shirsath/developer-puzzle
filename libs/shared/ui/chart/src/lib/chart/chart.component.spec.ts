import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { GoogleChartsModule } from 'angular-google-charts';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiChartModule,
        GoogleChartsModule.forRoot()
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
