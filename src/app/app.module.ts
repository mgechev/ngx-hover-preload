import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxHoverPreloadModule } from 'ngx-hover-preload';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxHoverPreloadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
