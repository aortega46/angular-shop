import { Injectable } from '@angular/core'
import { Product } from '../../interfaces/product'
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs'
import { CartProduct } from '../../interfaces/cart-product'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: BehaviorSubject<CartProduct[]>

  constructor() {
    const storedItems = localStorage.getItem('cart')
    const initialItems = storedItems ? JSON.parse(storedItems) : []

    this.cart = new BehaviorSubject<CartProduct[]>(initialItems)
  }

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

      this.updateLocalStorage(newCart)
      return this.cart.next(newCart)
    }

    const newCart = [...currentCart, { ...product, quantity: 1 }]
    this.updateLocalStorage(newCart)
    return this.cart.next(newCart)
  }

  checkProductInCart(id: number): Observable<boolean> {
    return this.cart.pipe(
      switchMap(cart => of(cart.some(item => item.id === id)))
    )
  }

  removeFromCart({ id }: { id: number }) {
    const currentCart = this.cart.getValue()
    const newCart = currentCart.filter(item => item.id !== id)
    this.cart.next(newCart)
    this.updateLocalStorage(newCart)
  }

  clearCart() {
    this.cart.next([])
    this.updateLocalStorage([])
  }

  updateLocalStorage(cart: CartProduct[]) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}
