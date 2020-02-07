import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { of } from 'rxjs';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { CHART_DATA_MOCK } from '../chart/mocks/chart-data-mock.spec';

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
  describe('ngOnInit()', () => {
    it('should set chart data when "data$" is empty', () => {
      component.data$ = of([]);
      component.ngOnInit();
      expect(component.chart).toEqual(CHART_DATA_MOCK);
    });
    it('should set chart data when "data$" is not empty', () => {
      component.data$ = of([['AAPL', 'Two Years'], ['AAPL', 'Tree Years']]);
      component.ngOnInit();
      expect(component.chart.data).toEqual([['AAPL', 'Two Years'], ['AAPL', 'Tree Years']]);
    });
  });
  describe('ngOnDestroy()', () => {
    it('should set isComponentActive flag to false', () => {
      expect(component['isComponentActive']).toBe(true);
      component.ngOnDestroy();
      expect(component['isComponentActive']).toBe(false);
    });
  });
});
