import { Component, Inject, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/app.token';
import { Product } from 'src/app/shared/services';

@Component({
  selector: 'nga-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent implements OnInit {

  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2], ['sm', 3], ['md', 5], ['lg', 2], ['xl', 3]
  ])
  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string,
  private readonly media: MediaObserver) {
    //if the inital screen size is xs Obsrvable Media doesnot emit an event
    //in the older version of flex-layout we used Observable Media, which is deprecated.
    //use mediaobserver instead
    this.columns$  = this.media.asObservable()
    .pipe(
      map(mc => <number>this.breakpointsToColumnsNumber.get("3")), startWith(3)
    );
  }

  ngOnInit(): void {
  }

  urlFor(product: Product){
    return `${this.baseUrl}/${product.imageUrl}`;
  }

}
