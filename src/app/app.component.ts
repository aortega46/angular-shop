import { Component } from '@angular/core'
import { ProductsListComponent } from './products-list/products-list.component'
import { HeaderComponent } from './header/header.component'
import { CartComponent } from './cart/cart.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent, HeaderComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
