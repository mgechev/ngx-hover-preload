import { Injectable } from '@angular/core';
import { PreloadingStrategy, Router, Route, PRIMARY_OUTLET } from '@angular/router';
import { EMPTY } from 'rxjs';
import { RegistryService } from './registry.service';

@Injectable()
export class HoverPreloadStrategy implements PreloadingStrategy {
  private _loading = new Set<Route>();
  constructor(private _router: Router, private _registry: RegistryService) {}

  preload(route: Route, load: Function) {
    if (this._loading.has(route)) {
      // Don't preload the same route twice
      return EMPTY;
    }
    // Prevent from preloading
    if (route.data && route.data.preload === false) {
      return EMPTY;
    }
    const path = findPath(this._router.config, route);
    if (this._registry.shouldPrefetch(path)) {
      this._loading.add(route);
      return load();
    }

    return EMPTY;
  }
}

const findPath = (config: Route[], route: Route): string => {
  config = config.slice();
  const parent = new Map<Route, Route>();
  const visited = new Set<Route>();
  while (config.length) {
    const el = config.shift();
    if (!el) {
      continue;
    }
    visited.add(el);
    if (el === route) break;
    let children = el.children || [];
    const current = (el as any)._loadedRoutes || [];
    for (const route of current) {
      if (route && route.children) {
        children = children.concat(route.children);
      }
    }
    children.forEach((r: Route) => {
      if (visited.has(r)) return;
      parent.set(r, el);
      config.push(r);
    });
  }
  let path = '';
  let current: Route | undefined = route;

  while (current) {
    if (isPrimaryRoute(current)) {
      path = `/${current.path}${path}`;
    } else {
      path = `/(${current.outlet}:${current.path}${path})`;
    }
    current = parent.get(current);
  }

  // For routes with empty paths (the resulted string will look like `///section/sub-section`)
  return path.replace(/[\/]+/, '/');
};

function isPrimaryRoute(route: Route) {
  return route.outlet === PRIMARY_OUTLET || !route.outlet;
}
