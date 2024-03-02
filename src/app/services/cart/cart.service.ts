import { Injectable } from '@angular/core'
import { Product } from '../../interfaces/product'
import { BehaviorSubject } from 'rxjs'
import { CartProduct } from '../../interfaces/cart-product'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<CartProduct[]>([])

  addToCart(product: Product) {
    const currentCart = this.cart.getValue()
    const productInCartIndex = currentCart.findIndex(
      item => item.id === product.id
    )

    if (productInCartIndex >= 0) {
      const newCart = [
        ...currentCart.slice(0, productInCartIndex),
        {
          ...currentCart[productInCartIndex],
          quantity: currentCart[productInCartIndex].quantity + 1,
        },
        ...currentCart.slice(productInCartIndex + 1),
      ]

      return this.cart.next(newCart)
    }

    const newCart = [...currentCart, { ...product, quantity: 1 }]
    return this.cart.next(newCart)
  }

  clearCart() {
    this.cart.next([])
  }
}
