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
    requestIdleCallback(() => {
      this._registry.add(this._rl.urlTree);
      this._loader.preload().subscribe(() => void 0);
    });
  }
}

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

type RequestIdleCallback = ((
  callback: ((deadline: RequestIdleCallbackDeadline) => void),
  opts?: RequestIdleCallbackOptions
) => RequestIdleCallbackHandle);

const requestIdleCallback: RequestIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).requestIdleCallback ||
      function(cb: Function) {
        const start = Date.now();
        return setTimeout(function() {
          cb({
            didTimeout: false,
            timeRemaining: function() {
              return Math.max(0, 50 - (Date.now() - start));
            }
          });
        }, 1);
      }
    : () => {};
