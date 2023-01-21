import { Product } from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let product = new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });
  it('should throw error when price is less than zero', () => {
    expect(() => {
      let product = new Product('1', 'Teste', -1);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change product name', () => {
    let product = new Product('1', 'P1', 100);
    product.changeName('P2');
    expect(product.name).toBe('P2');
  });
  it('should change product price', () => {
    let product = new Product('1', 'P1', 100);
    product.changePrice(250);
    expect(product.price).toBe(250);
  });
});
