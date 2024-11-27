import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HoverPrefetchLinkDirective } from 'ngx-hover-preload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, HoverPrefetchLinkDirective]
})
export class AppComponent {
  title = 'ngx-hover-preload-example';
}
