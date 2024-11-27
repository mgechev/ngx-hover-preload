[![mgechev](https://circleci.com/gh/mgechev/ngx-hover-preload.svg?style=svg)](https://app.circleci.com/pipelines/github/mgechev/ngx-hover-preload)

<p align="center">
   <img src="https://github.com/mgechev/ngx-hover-preload/blob/master/assets/ngx-hover-preload.png?raw=true" width="200px">
</div>

# ngx-hover-preload

This package exports a `PreloadingStrategy`, which will preload a lazy-loaded route on mouse over a corresponding router link.

## Alternatives

Other preloading strategies:
- [`ngx-quicklink`](https://github.com/mgechev/ngx-quicklink) - Preloads the modules associated with *all* links visible in the viewport. Quicklink does more aggressive preloading compared to `ngx-hover-preload`, which makes it more network and CPU intensive.
- [Guess.js](https://github.com/guess-js/guess) - Most advanced preloading strategy, which uses predictive prefetching. At build-time Guess.js compiles a data analytics model and includes it in your production bundle, so that at runtime after each navigation Guess.js prefetches *only* the modules that are likely to be needed next. Guess.js works particularly well with `ngx-hover-preload`, because if the prediction was wrong the preloading mechanism gracefully fallbacks to hover.

## Example

Example is available [here](https://github.com/mgechev/ngx-hover-preload/tree/master/src).

## Usage

Install the module:
```
yarn add ngx-hover-preload
```

### Standalone

Configure your app with the correct providers:

```ts
bootstrapApplication(AppComponent, {
  providers: [hoverPrefetchProviders, provideRouter(routes, withPreloading(HoverPreloadStrategy))]
});
```

Make sure you import the `HoverPrefetchLinkDirective` anywhere you want to enable prefetching.

In case you want to disable prefetching for a particular route specify:

```ts
{
  path: 'foo',
  data: {
    preload: false
  }
}
```

### NgModules

Import the `HoverPreloadModule`  in your `AppModule` and your lazy-loaded modules to ensure the required directives are available:

```ts
// ...
import { HoverPreloadModule } from 'ngx-hover-preload';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    HoverPreloadModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Make sure you import the `HoverPreloadModule` in all lazy-loaded modules in which you want to have this functionality available**

Don't forget to set the `HoverPreloadStrategy` as your `preloadStrategy`:

```ts
// ...
import { HoverPreloadStrategy } from 'ngx-hover-preload';

@NgModule({
  // ...
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: HoverPreloadStrategy })],
})
export class AppModule {} // or AppRoutingModule
```

## License

MIT
