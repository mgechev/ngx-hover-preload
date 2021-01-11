import {
  Directive, Optional,
} from '@angular/core';
import { RouterLink, RouterLinkWithHref, RouterPreloader } from '@angular/router';
import { RegistryService } from './registry.service';

@Directive({
  selector: '[routerLink]',
  host: {
    '(mouseenter)': 'prefetch()'
  }
})
export class LinkDirective {
  private _rl: RouterLink | RouterLinkWithHref;
  constructor(
    private _loader: RouterPreloader,
    private _registry: RegistryService,
    @Optional() link: RouterLink,
    @Optional() linkWithHref: RouterLinkWithHref
  ) {
    this._rl = link || linkWithHref;
  }

  prefetch() {
    this._registry.add(this._rl.urlTree);
    this._loader.preload().subscribe(() => void 0);
  }
}
