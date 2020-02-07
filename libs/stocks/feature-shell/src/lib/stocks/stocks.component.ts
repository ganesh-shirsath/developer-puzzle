import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

import { EStocksErrorMsg } from '../stocks/enums/stocks-error-msg-enums';
import { EStocksPlaceholder } from '../stocks/enums/stocks-placeholder-enums';
import { EStockLabel } from '../stocks/enums/stocks-label-enums'
import { TIME_PERIODS_RESPONSE } from '../stocks/mocks/stocks-mock.spec';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  // tslint:disable-next-line:no-inferrable-types
  private isComponentActive: boolean = true;

  public quotes$: Observable<(string | number)[][]> = this.priceQuery.priceQueries$;
  public formPlaceholders = EStocksPlaceholder;
  public formErrors = EStocksErrorMsg;
  public timePeriods = TIME_PERIODS_RESPONSE.timePeriods;
  public formLabels = EStockLabel;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit() {
    this.stockPickerForm.valueChanges
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(() => {
      this.fetchQuote();
    });
  }

  private fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  public ngOnDestroy(): void {
    this.isComponentActive = false;
  }
}
