import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EChartErrorMsg } from '../chart/enums/chart.enums';
import { IChartData } from '../chart/interfaces/chart.interface';
import { CHART_DATA_MOCK } from '../chart/mocks/chart-data-mock.spec';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<(string | number)[][]>;

  private isComponentActive = true;
  public isStocksDataFound = false;
  public chart: IChartData = CHART_DATA_MOCK;
  public chartError = EChartErrorMsg;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    this.data$.pipe(takeWhile(() => this.isComponentActive))
    .subscribe(newData => (
      this.chart.data = newData,
      this.isStocksDataFound = true
    ));
  }

  public ngOnDestroy(): void {
    this.isComponentActive = false;
  }
}
