import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '../product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductSuggestionComponent],
  imports: [
    CommonModule, FlexLayoutModule, MatButtonModule, MatGridListModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ])
  ]
})
export class ProductModule { }
