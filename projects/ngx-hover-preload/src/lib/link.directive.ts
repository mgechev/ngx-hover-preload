import {
  Directive, Optional,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkWithHref, RouterPreloader } from '@angular/router';
import { HoverPreloadStrategy } from './hover-preload.strategy';
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
    private _route: ActivatedRoute,
    private _registry: RegistryService,
    @Optional() link: RouterLink,
    @Optional() linkWithHref: RouterLinkWithHref
  ) {
    this._rl = link || linkWithHref;
  }

  prefetch() {
    this._registry.register(this.urlTree);
    this._loader.preload().subscribe(() => void 0);
  }

  get urlTree() {
    return this._rl.urlTree;
  }
}
