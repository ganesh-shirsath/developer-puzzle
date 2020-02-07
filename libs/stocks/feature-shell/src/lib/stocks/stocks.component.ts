import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import moment from 'moment';
import { EStocksErrorMsg } from '../stocks/enums/stocks-error-msg-enums';
import { EStocksPlaceholder, EStocksButtons } from '../stocks/enums/stocks-placeholder-enums';
import { EStocksPeriods } from '../stocks/enums/stocks-periods-enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  public currentDate = new Date();
  public maxDate = new Date(this.currentDate);
  public quotes$: Observable<(string | number)[][]>;
  private isComponentActive: Boolean = true;
  public formPlaceholders = EStocksPlaceholder;
  public formErrors = EStocksErrorMsg;
  public buttons = EStocksButtons;
  public timePeriods = EStocksPeriods;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.quotes$ = this.priceQuery.priceQueries$;
  }

  public fetchQuote() {
    if (this.stockPickerForm.valid) {
      this.updateDate(this.stockPickerForm);
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, EStocksPeriods.ALL_AVAILABLE_DATA);
      this.priceQuery.fetchFilterQuoteByDate(
        this.stockPickerForm.value.fromDate, this.stockPickerForm.value.toDate
      );
    }
  }

  public dateValidator(stockPickerForm: FormGroup): boolean {
    return moment(stockPickerForm.value.fromDate).isAfter(stockPickerForm.value.toDate);
  }

  public updateDate(stockPickerForm: FormGroup): void {
    if (this.dateValidator(stockPickerForm)) {
      this.stockPickerForm.value.toDate = stockPickerForm.value.fromDate;
      this.stockPickerForm.controls['toDate'].setValue(stockPickerForm.value.fromDate);
    }
  }
}
