import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HoverPreloadModule } from 'ngx-hover-preload';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HoverPreloadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
