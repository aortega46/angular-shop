import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CartItemComponent } from '../cart-item/cart-item.component'
import { CartService } from '../services/cart/cart.service'
import { AsyncPipe } from '@angular/common'
import { CartProduct } from '../interfaces/cart-product'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, CartItemComponent, AsyncPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  isCartOpened: boolean = false

  cartService = inject(CartService)

  toggleCart() {
    this.isCartOpened = !this.isCartOpened
  }

  addToCart(cartProduct: CartProduct) {
    this.cartService.addToCart(cartProduct)
  }
}
