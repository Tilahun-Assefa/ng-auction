import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs'

import { CategoriesComponent } from './categories/categories.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { SearchComponent } from './search/search.component';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search', component: SearchComponent },
  {
    path: 'categories', children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: CategoriesComponent }
    ]
  }
];

@NgModule({
  declarations: [CategoriesComponent, ProductGridComponent, SearchComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FlexLayoutModule,
    MatGridListModule, MatTabsModule
  ]
})
export class HomeModule { }
