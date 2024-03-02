import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CartItemComponent } from '../cart-item/cart-item.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, CartItemComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  isCartOpened: boolean = false

  toggleCart() {
    this.isCartOpened = !this.isCartOpened
  }
}
