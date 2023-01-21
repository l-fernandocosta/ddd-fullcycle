import Address from './adress';
import Customer from './customer';

describe('Customer unity tests', () => {
  it('should throw error when id is empty', async () => {
    expect(() => {
      let customer = new Customer('', 'Jhon');
    }).toThrowError('Id is required');
  });
  it('should throw error when name is empty', () => {
    let customer = new Customer('1', 'Jhon');
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('Name is required');
  });
  it('should change name', () => {
    const customer = new Customer('123', 'Jhon');
    customer.changeName('Fernando Costa');
    expect(customer.name).toBe('Fernando Costa');
  });

  // TRIPLE A
  it('should activate  customer', () => {
    // ARRANGE
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', '123', '13330-250', 'São Paulo');
    customer.Address = address;
    //ACT
    customer.activate();
    //ASSERT
    expect(customer.isActive()).toBe(true);
  });
  it('should deactivate  customer', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', '123', '13330-250', 'São Paulo');
    customer.Address = address;

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });
});
