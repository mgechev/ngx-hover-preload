import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, ParamMap, DefaultUrlSerializer } from '@angular/router';

import { RegistryService } from './registry.service';

const map: ParamMap = {
  has(_: string): boolean {
    return false;
  },
  get(_: string): string|null{
    return  null;
  },
  getAll(_: string): string[] {
    return [];
  },
  keys: []
};

const nestedPath: UrlTree = {
  root: {
    segments: [],
    children: {
      primary: {
        segments: [
          {
            path: 'about',
            parameters: {},
            parameterMap: map
          },
          {
            path: 'customers',
            parameters: {},
            parameterMap: map
          },
          {
            path: '3',
            parameters: {},
            parameterMap: map
          },
        ],
        children: {},
        parent: null,
        hasChildren: () => true,
        numberOfChildren: 3
      },
    },
    parent: null,
    hasChildren: () => true,
    numberOfChildren: 3
  },
  fragment: null,
  queryParamMap: map,
  queryParams: {},
};

describe('NgxHoverPreloadService', () => {
  let service: RegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: new Router(
            null,
            new DefaultUrlSerializer(),
            null as any,
            null as any,
            {
              get() {
                return null;
              }
            },
            null as any,
            null as any,
            {
              map() {
                return {};
              }
            }  as any
          ),
        },
      ],
    });
    service = TestBed.inject(RegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to find path with correct tree', () => {
    service.add(nestedPath);
    expect(service.shouldPrefetch('/about')).toBe(true);
    expect(service.shouldPrefetch('/contact')).toBe(false);
    expect(service.shouldPrefetch('/about/customers/:id')).toBe(true);
    expect(service.shouldPrefetch('/about/customers/1')).toBe(false);
  });
});
