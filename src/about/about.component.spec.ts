import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;

  beforeEach(async () => {
    component = new AboutComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
