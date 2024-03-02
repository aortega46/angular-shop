import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductItemComponent } from './product-item.component'
import { Product } from '../interfaces/product'

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
})
