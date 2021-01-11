# ngx-hover-preload

This package exports a `PreloadingStrategy`, which will preload a lazy-loaded route on mouse over a corresponding router link.

## Alternatives

Other preloading strategies:
- [`ngx-quicklink`](https://github.com/mgechev/ngx-quicklink) - Preloads the modules associated with *all* links visible in the viewport. Quicklink does more aggressive preloading compared to `ngx-hover-preload`, which makes it more network and CPU intensive.
- [Guess.js](https://github.com/guess-js/guess) - Most advanced preloading strategy, which uses predictive prefetching. At build-time Guess.js compiles a data analytics model and includes it in your production bundle, so that at runtime after each navigation Guess.js prefetches *only* the modules that are likely to be needed next. Guess.js works particularly well with `ngx-hover-preload`, because if the prediction was wrong the preloading mechanism gracefully fallbacks to hover.

## Example



## Usage

Install the module:
```
yarn add ngx-hover-preload
```

Import the `NgxHoverPreloadModule`  in your `AppModule` and your lazy-loaded modules to ensure the required directives are available:

```ts
// ...
import { NgxHoverPreloadModule } from 'ngx-hover-preload';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    NgxHoverPreloadModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Make sure you import the `NgxHoverPreloadModule` in all lazy-loaded modules in which you want to have this functionality available**

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
