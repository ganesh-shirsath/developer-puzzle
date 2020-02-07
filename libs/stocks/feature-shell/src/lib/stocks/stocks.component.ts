import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Observable } from 'rxjs';
import { EStocksErrorMsg } from '../stocks/enums/stocks-error-msg-enums';
import {
  EStocksPlaceholder, EStocksButtons, EStockLabel
} from '../stocks/enums/stocks-placeholder-enums';
import { TIME_PERIODS_RESPONSE } from '../stocks/mocks/stocks-mock.spec';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  public quotes$: Observable<(string | number)[][]> = this.priceQuery.priceQueries$;
  public formPlaceholders = EStocksPlaceholder;
  public formErrors = EStocksErrorMsg;
  public buttons = EStocksButtons;
  public timePeriods = TIME_PERIODS_RESPONSE.timePeriods;
  public formLabels = EStockLabel;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit() { }

  public fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
