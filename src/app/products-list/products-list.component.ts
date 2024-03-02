import { Component, OnInit, inject } from '@angular/core'
import { ProductItemComponent } from '../product-item/product-item.component'
import { ProductsService } from '../services/products/products.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductItemComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  productsService = inject(ProductsService)

  ngOnInit(): void {
    this.productsService.filterProducts()
  }
}
