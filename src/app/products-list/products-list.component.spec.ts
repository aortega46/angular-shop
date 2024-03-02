import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductsListComponent } from './products-list.component'
import { ProductsService } from '../services/products.service'
import { of } from 'rxjs'

describe('ProductsListComponent', () => {
  let component: ProductsListComponent
  let fixture: ComponentFixture<ProductsListComponent>

  let compiled: HTMLElement
  let productsServiceStub: Partial<ProductsService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [{ provide: ProductsService, useValue: productsServiceStub }],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductsListComponent)
    component = fixture.componentInstance

    compiled = fixture.nativeElement

    productsServiceStub = {
      filterProducts: () => {},
      filteredProducts$: of([
        { id: 1, title: 'Product 1', price: 20, thumbnail: 'test1.png' },
        { id: 2, title: 'Product 2', price: 30, thumbnail: 'test2.png' },
        { id: 3, title: 'Product 3', price: 15, thumbnail: 'test3.png' },
      ] as any),
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot()
  })

  it('should call filterProducts OnInit', () => {
    const service = TestBed.inject(ProductsService)
    const spyFilterProducts = jest.spyOn(service, 'filterProducts')

    // here calls ngOnInit
    fixture.detectChanges()

    expect(spyFilterProducts).toHaveBeenCalledTimes(1)
  })

  it('should display filteredProducts$', () => {
    fixture.detectChanges()

    const productElements = compiled.querySelectorAll('product-item')
    expect(productElements.length).toBe(3)
    expect(productElements[0].textContent).toContain('Product 1')
    expect(productElements[0].textContent).toContain('$20')
    expect(
      productElements[0].querySelector('img')?.getAttribute('src')
    ).toContain('test1.png')

    expect(productElements[1].textContent).toContain('Product 2')
  })
})
