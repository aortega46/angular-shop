import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductItemComponent } from './product-item.component'
import { Product } from '../interfaces/product'
import { CartService } from '../services/cart/cart.service'
import { inject } from '@angular/core'

const productMock: Product = {
  id: 1,
  title: 'Test',
  price: 100,
  thumbnail: 'test.png',
}

describe('ProductItemComponent', () => {
  let component: ProductItemComponent
  let fixture: ComponentFixture<ProductItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemComponent],
      providers: [CartService],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductItemComponent)
    component = fixture.componentInstance

    component.product = productMock

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement
    expect(compiled).toMatchSnapshot()
  })

  it('should call service when #addToCart', () => {
    const service = TestBed.inject(CartService)
    const spyAddToCart = jest.spyOn(service, 'addToCart')

    component.addToCart()

    expect(spyAddToCart).toHaveBeenCalledWith(component.product)
  })

  it('should call service when #removeFromCart', () => {
    const service = TestBed.inject(CartService)
    const spyRemoveFromCart = jest.spyOn(service, 'removeFromCart')

    component.removeFromCart()

    expect(spyRemoveFromCart).toHaveBeenCalledWith({ id: component.product.id })
  })
})
