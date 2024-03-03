import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CartComponent } from './cart.component'
import { CartService } from '../services/cart/cart.service'
import { CartProduct } from '../interfaces/cart-product'

describe('CartComponent', () => {
  let component: CartComponent
  let fixture: ComponentFixture<CartComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot()
  })

  it('should toggleCart', () => {
    const intialState = component.isCartOpened

    component.toggleCart()
    expect(component.isCartOpened).not.toEqual(intialState)

    component.toggleCart()
    expect(component.isCartOpened).toEqual(intialState)
  })

  it('should call service when #addToCart', () => {
    const service = TestBed.inject(CartService)
    const spyAddToCart = jest.spyOn(service, 'addToCart')

    const mockProduct: CartProduct = {
      id: 1,
      title: 'Product 1',
      price: 10,
      thumbnail: 'test.png',
      quantity: 1,
    }

    component.addToCart(mockProduct)
    expect(spyAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('should display cart items', () => {
    const cartItems = compiled.querySelectorAll('cart-item')

    expect(cartItems.length).toBe(1)
    expect(cartItems[0].textContent).toContain('Product 1')
    expect(cartItems[0].textContent).toContain('$10')
    expect(cartItems[0].querySelector('img')?.getAttribute('src')).toContain(
      'test.png'
    )
  })
})
