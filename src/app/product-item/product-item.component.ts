import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Product } from '../interfaces/product'

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  // * At this point,signal inputs exists so it can be done with that
  // https://angular.io/guide/signal-inputs#why-should-we-use-signal-inputs-and-not-input
  @Input() product!: Product

  @Output() onAddToCart = new EventEmitter<Product>()

  addToCart() {
    this.onAddToCart.emit(this.product)
  }
}
