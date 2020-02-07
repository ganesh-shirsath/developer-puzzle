import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { FormBuilder } from '@angular/forms';
import { PriceQueryFacade } from '../../../../data-access-price-query/src';
import { StoreModule } from '@ngrx/store';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';

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
});
