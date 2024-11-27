import { NgModule } from '@angular/core';
import { HoverPreloadStrategy } from './hover-preload.strategy';
import { LinkDirective } from './link.directive';


@NgModule({
  declarations: [],
  imports: [LinkDirective],
  providers: [HoverPreloadStrategy],
  exports: [LinkDirective]
})
export class HoverPreloadModule { }
