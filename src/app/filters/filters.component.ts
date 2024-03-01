import { Component, inject } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  productsService = inject(ProductsService)

  handleChangeMinPrice(event: Event) {
    const minPrice = +(event.target as HTMLInputElement).value
    this.productsService.updateFilters({ minPrice })
  }

  handleChangeCategory(event: Event) {
    const category = (event.target as HTMLInputElement).value
    this.productsService.updateFilters({ category })
  }
}
