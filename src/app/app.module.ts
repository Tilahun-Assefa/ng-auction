import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SearchFormModule } from './shared/components';
import { API_BASE_URL, WS_URL } from './app.token';
import { AngularFlexLayoutComponent } from './angular-flex-layout/angular-flex-layout.component';
import { SHARED_SERVICES } from './shared/services';

@NgModule({
  declarations: [
    AppComponent, AngularFlexLayoutComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FlexLayoutModule, HttpClientModule,
    AppRoutingModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule,
    BrowserAnimationsModule, SearchFormModule, MatCardModule,
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: WS_URL, useValue: environment.wsUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
