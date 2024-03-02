import { Component, OnInit, inject } from '@angular/core'
import { ProductItemComponent } from '../product-item/product-item.component'
import { ProductsService } from '../services/products/products.service'
import { AsyncPipe } from '@angular/common'
import { Product } from '../interfaces/product'
import { CartService } from '../services/cart/cart.service'

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductItemComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  productsService = inject(ProductsService)
  cartService = inject(CartService)

  ngOnInit(): void {
    this.productsService.filterProducts()
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}
