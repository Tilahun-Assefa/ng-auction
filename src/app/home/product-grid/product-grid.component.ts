import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { API_BASE_URL } from 'src/app/app.token';
import { Product } from '../../shared/services/product.service';

@Component({
  selector: 'nga-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent implements OnInit {

  @Input() products: Product[] = [];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1], ['sm', 2], ['md', 3], ['lg', 4], ['xl', 5]
  ]);
  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string, private readonly media: MediaObserver) {
    this.columns$ = this.media.asObservable().pipe(
      map(
        (mc: MediaChange[]) => <number>this.breakpointsToColumnsNumber.get(mc[0].mqAlias)),
      startWith(3)
    );
  }

  ngOnInit(): void {
  }

  urlFor(product: Product){
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
