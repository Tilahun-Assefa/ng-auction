import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/shared/services';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  readonly categories$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.categories$ = this.productService.getAllCategories().pipe(
      map(categories => ['all', ...categories])
    );

    this.products$ = this.route.params.pipe(
      switchMap(({ category }) => this.getCategory(category))
    );
  }

  ngOnInit(): void {
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all' ? this.productService.getAll() :
      this.productService.getByCategory(category.toLowerCase());
  }
}
