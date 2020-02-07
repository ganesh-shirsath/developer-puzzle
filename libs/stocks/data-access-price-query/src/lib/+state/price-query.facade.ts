import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery, FilterQuote } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getSelectedSymbol, getAllPriceQueries } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, period: string) {
    this.store.dispatch(new FetchPriceQuery(symbol, period));
  }

  public fetchFilterQuoteByDate(fromDate: Date, toDate: Date) {
    this.store.dispatch(new FilterQuote(fromDate, toDate));
  }
}
