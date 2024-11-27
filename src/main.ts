import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading } from '@angular/router';
import { HoverPreloadStrategy, hoverPrefetchProviders } from 'ngx-hover-preload';
import { routes } from './app/routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [hoverPrefetchProviders, provideRouter(routes, withPreloading(HoverPreloadStrategy))]
});