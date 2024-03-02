import { TestBed } from '@angular/core/testing'

import { ProductsService } from './products.service'
import { BehaviorSubject } from 'rxjs'

describe('ProductsService', () => {
  let service: ProductsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should filter products based on provided filters', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 20, category: 'electronics' },
      { id: 2, title: 'Product 2', price: 30, category: 'clothing' },
      { id: 3, title: 'Product 3', price: 15, category: 'electronics' },
    ]
    service['products'] = mockProducts as any

    service.filters = new BehaviorSubject({
      minPrice: 20,
      category: 'electronics',
    })

    service.filterProducts()

    const filteredProducts = service.filteredProducts.getValue()
    expect(filteredProducts).toHaveLength(1)
    expect(filteredProducts[0].id).toBe(1)
  })

  it('should update filters', () => {
    const initialFilters = service.filters.getValue()
    const expectedFilters = { minPrice: 20, category: 'electronics' }
    service.updateFilters(expectedFilters)

    expect(service.filters.getValue()).not.toEqual(initialFilters)
    expect(service.filters.getValue()).toEqual(expectedFilters)
  })
})
