import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CartProduct } from '../interfaces/cart-product'

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() product!: CartProduct

  @Output() onAddToCart = new EventEmitter<CartProduct>()

  addToCart() {
    this.onAddToCart.emit(this.product)
  }
}
