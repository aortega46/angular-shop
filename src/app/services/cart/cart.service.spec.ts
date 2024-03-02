import { TestBed } from '@angular/core/testing'

import { CartService } from './cart.service'
import { Product } from '../../interfaces/product'
import { take } from 'rxjs'

describe('CartService', () => {
  let service: CartService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CartService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add product cart when #addToCart', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        thumbnail: 'test.png',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        thumbnail: 'test.png',
      },
    ]

    service.addToCart(mockProducts[0])
    service.addToCart(mockProducts[1])

    const currentCart = service.cart.getValue()
    expect(currentCart.length).toBe(2)
    expect(currentCart[0].quantity).toBe(1)
  })

  it('should update product cart when #addToCart', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 20,
      thumbnail: 'test.png',
    }

    service.addToCart(mockProduct)

    const currentCart = service.cart.getValue()
    expect(currentCart.length).toBe(2)
    expect(currentCart[0].quantity).toBe(2)
  })

  it('should remove from cart 1 product when#removeFromCart', () => {
    service.removeFromCart({ id: 1 })

    const currentCart = service.cart.getValue()
    expect(currentCart.length).toBe(1)
    expect(currentCart[0].title).toContain('Product 2')
  })

  it('should clear cart', () => {
    service.clearCart()

    const currentCart = service.cart.getValue()
    expect(currentCart.length).toBe(0)
  })

  it('should return boolean when #checkProductInCart', () => {
    let isProductInCart: boolean | undefined

    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 20,
      thumbnail: 'test.png',
    }

    service
      .checkProductInCart(1)
      .pipe(take(2))
      .subscribe(res => (isProductInCart = res))

    expect(isProductInCart).toBeFalsy()

    service.addToCart(mockProduct)

    expect(isProductInCart).toBeTruthy()
  })
})
