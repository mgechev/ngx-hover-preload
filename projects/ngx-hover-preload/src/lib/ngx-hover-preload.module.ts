import { NgModule } from '@angular/core';
import { HoverPreloadStrategy } from './hover-preload.strategy';
import { LinkDirective } from './link.directive';


@NgModule({
  declarations: [LinkDirective],
  imports: [],
  providers: [HoverPreloadStrategy],
  exports: [LinkDirective]
})
export class NgxHoverPreloadModule { }
