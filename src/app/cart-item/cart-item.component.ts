import { Component, Input } from '@angular/core'
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
}
