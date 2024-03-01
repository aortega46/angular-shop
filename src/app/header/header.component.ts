import { Component } from '@angular/core'
import { FiltersComponent } from '../filters/filters.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
