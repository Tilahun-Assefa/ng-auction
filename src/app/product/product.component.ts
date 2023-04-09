import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../shared/services';

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  readonly product$: Observable<Product>;
  readonly suggestedProducts$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.product$ = this.route.paramMap.pipe(
      map(params => parseInt(params.get('productId') || '', 10)),
      filter(productId => Boolean(productId)),
      switchMap(productId => this.productService.getById(productId))
    );

    this.suggestedProducts$ = this.productService.getAll();
   }

  ngOnInit(): void {
  }

}
