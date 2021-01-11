import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    component = new AppComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ngx-hover-preload-example'`, () => {
    expect(component.title).toEqual('ngx-hover-preload-example');
  });
});
