import { Injectable } from '@angular/core'
import { products } from '../mocks/products.json'
import { BehaviorSubject } from 'rxjs'
import { Product } from '../interfaces/product'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = products.slice(0, 10)

  filteredProducts = new BehaviorSubject<Product[]>([])
  filteredProducts$ = this.filteredProducts.asObservable()

  filters = new BehaviorSubject<{ minPrice: number; category: string }>({
    minPrice: 0,
    category: 'all',
  })

  filterProducts() {
    this.filters.subscribe(({ minPrice, category }) => {
      const filtered = this.products.filter(
        product =>
          product.price >= minPrice &&
          (category === 'all' || product.category === category)
      )

      this.filteredProducts.next(filtered)
    })
  }

  updateFilters(
    updates: Partial<{
      minPrice: number
      category: string
    }>
  ) {
    const currentFilters = this.filters.getValue()
    this.filters.next({ ...currentFilters, ...updates })
  }
}
