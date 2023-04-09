import { Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/app.token';
import { BidMessage, BidService, Product } from 'src/app/shared/services';

@Component({
  selector: 'nga-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;

  constructor(@Inject(API_BASE_URL) private readonly baseurl: string,
    private readonly bidService: BidService) { }

  ngOnChanges({product}:{product: SimpleChange}): void {
    this.productChange$.next(product.currentValue);
  }

  ngOnInit(): void {
    this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage | null>(null)),
      (product, bid) => bid && bid.productId === product.id ? bid.price : product.price
    );
  }   
  
  placeBid(price: number){
    this.bidService.placeBid(this.product.id, price);
  }
  
  urlFor(product: Product): string {
    return `${this.baseurl}/${product.imageUrl}`;
  }
}

