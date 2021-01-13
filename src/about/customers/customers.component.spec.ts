import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;

  beforeEach(() => {
    component = new CustomersComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
