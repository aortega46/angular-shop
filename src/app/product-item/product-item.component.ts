import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Product } from '../interfaces/product'
import { Subscription } from 'rxjs'
import { CartService } from '../services/cart/cart.service'

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product!: Product

  cartService = inject(CartService)

  isOnCart: boolean = false

  checkProductInCartSub?: Subscription

  ngOnInit(): void {
    this.checkProductInCartSub = this.cartService
      .checkProductInCart(this.product.id)
      .subscribe(isOnCart => (this.isOnCart = isOnCart))
  }

  ngOnDestroy() {
    this.checkProductInCartSub?.unsubscribe()
  }

  addToCart() {
    this.cartService.addToCart(this.product)
  }

  removeFromCart() {
    this.cartService.removeFromCart({ id: this.product.id })
  }
}
