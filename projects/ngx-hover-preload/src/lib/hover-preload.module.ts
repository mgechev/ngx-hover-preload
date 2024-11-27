import { NgModule } from '@angular/core';
import { HoverPreloadStrategy } from './hover-preload.strategy';
import { LinkDirective } from './link.directive';
import { RegistryService } from './registry.service';


export const hoverPrefetchProviders = [
  HoverPreloadStrategy,
  RegistryService
];

@NgModule({
  declarations: [],
  imports: [LinkDirective],
  providers: [hoverPrefetchProviders],
  exports: [LinkDirective]
})
export class HoverPreloadModule { }
