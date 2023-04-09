import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/shared/services';

@Component({
  selector: 'nga-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  readonly products$: Observable<Product[]>;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap(queryParams => this.productService.search(queryParams))
    );
  }

  ngOnInit(): void {
  }

}
