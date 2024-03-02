import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CartItemComponent } from './cart-item.component'
import { CartProduct } from '../interfaces/cart-product'
import { CartComponent } from '../cart/cart.component'

const productMock: CartProduct = {
  id: 1,
  title: 'Test',
  price: 100,
  thumbnail: 'test.png',
  quantity: 1,
}

describe('CartItemComponent', () => {
  let component: CartItemComponent
  let fixture: ComponentFixture<CartItemComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
      providers: [
        {
          provide: CartComponent,
          useValue: { addToCart: (product: CartProduct) => product.quantity++ },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CartItemComponent)
    component = fixture.componentInstance

    component.product = productMock

    fixture.detectChanges()

    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot()
  })

  it('should emit when #addToCart', () => {
    const spyOnAddToCart = jest.spyOn(component.onAddToCart, 'emit')

    component.addToCart()

    expect(spyOnAddToCart).toHaveBeenCalledWith(component.product)
  })

  it('should update cart item when #addToCart', () => {
    const spyOnAddToCart = jest.spyOn(component.onAddToCart, 'emit')
    const cart = TestBed.inject(CartComponent)

    spyOnAddToCart.mockImplementation(prod => cart.addToCart(prod!))

    component.addToCart()

    expect(spyOnAddToCart).toHaveBeenCalledWith(component.product)
    expect(component.product.quantity).toBe(2)
  })
})
