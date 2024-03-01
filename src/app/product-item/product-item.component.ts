import { Component, Input } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product?: any
}
