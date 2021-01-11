import { Injectable } from "@angular/core";
import { Params, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RegistryService {
  // Using a map so we don't add an element
  // on each hover. This will generally reduce memory
  // usage and will not require cleanup.
  private _queue = new Set<UrlTree>([]);

  constructor(private router: Router) {}

  add(route: UrlTree) {
    this._queue.add(route);
  }

  shouldPrefetch(url: string) {
    const tree = this.router.parseUrl(url);
    return [...this._queue].some(containsTree.bind(null, tree));
  }
}

function containsQueryParams(container: Params, containee: Params): boolean {
  // TODO: This does not handle array params correctly.
  return (
    Object.keys(containee).length <= Object.keys(container).length &&
    Object.keys(containee).every(key => containee[key] === container[key])
  );
}

function containsTree(containee: UrlTree, container: UrlTree): boolean {
  return (
    containsQueryParams(container.queryParams, containee.queryParams) &&
    containsSegmentGroup(container.root, containee.root, containee.root.segments)
  );
}

function containsSegmentGroup(
  container: UrlSegmentGroup,
  containee: UrlSegmentGroup,
  containeePaths: UrlSegment[]
): boolean {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths)) return false;
    if (containee.hasChildren()) return false;
    return true;
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths)) return false;
    if (!containee.hasChildren()) return true;

    for (const c in containee.children) {
      if (!container.children[c]) break;
      if (
        containsSegmentGroup(
          container.children[c],
          containee.children[c],
          containee.children[c].segments
        )
      )
        return true;
    }
    return false;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current)) return false;
    if (!container.children[PRIMARY_OUTLET]) return false;
    return containsSegmentGroup(container.children[PRIMARY_OUTLET], containee, next);
  }
}

export function equalPath(as: UrlSegment[], bs: UrlSegment[]): boolean {
  if (as.length !== bs.length) return false;
  return as.every(
    (a, i) => a.path === bs[i].path || a.path.startsWith(':') || bs[i].path.startsWith(':')
  );
}
