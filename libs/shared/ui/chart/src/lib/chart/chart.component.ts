import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
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
  public chart: IChartData;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chart = CHART_DATA_MOCK;
    this.data$.pipe(takeWhile(() => this.isComponentActive))
      .subscribe(newData => (
        this.chart.data = newData
      ));
  }

  public ngOnDestroy(): void {
    this.isComponentActive = false;
  }
}
