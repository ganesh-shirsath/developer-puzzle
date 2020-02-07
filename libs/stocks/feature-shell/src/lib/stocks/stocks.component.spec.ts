import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { StoreModule } from '@ngrx/store';
import { StocksFeatureShellModule } from '../../../../../stocks/feature-shell/src/lib/stocks-feature-shell.module';
import { PriceQueryFacade } from '../../../../data-access-price-query/src';
import { FormBuilder, Validators } from '@angular/forms';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StocksFeatureShellModule,
        StoreModule.forRoot({})
      ],
      providers: [
        PriceQueryFacade,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchQuote()', () => {
    beforeEach(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: ['AAPL', Validators.required],
        period: ['One Month', Validators.required]
      });
    });
    it('should invoke fetchQuote of priceQuery', async(() => {
      spyOn(priceQuery, 'fetchQuote').and.stub();
      component.fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
      expect(priceQuery.fetchQuote).toHaveBeenCalledWith('AAPL', 'One Month');
    }));
    it('should not invoke fetchQuote of priceQuery if form is invalid', async(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: [null, Validators.required],
        period: [null, Validators.required]
      });
      spyOn(priceQuery, 'fetchQuote').and.stub();
      component.fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    }));
  });
});
