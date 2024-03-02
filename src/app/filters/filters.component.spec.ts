import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FiltersComponent } from './filters.component'
import { By } from '@angular/platform-browser'
import { ProductsService } from '../services/products/products.service'

describe('FiltersComponent', () => {
  let component: FiltersComponent
  let fixture: ComponentFixture<FiltersComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [ProductsService],
    }).compileComponents()

    fixture = TestBed.createComponent(FiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot()
  })

  it('should call handleChangeMinPrice when user updates minPrice filter', () => {
    const spyHandleChangeMinPrice = jest.spyOn(
      component,
      'handleChangeMinPrice'
    )

    const mockProductsService = TestBed.inject(ProductsService)
    const spyUpdateFilters = jest.spyOn(mockProductsService, 'updateFilters')

    const inputElement = fixture.debugElement.query(By.css('input'))
    inputElement.triggerEventHandler('input', { target: { value: 500 } })

    expect(spyHandleChangeMinPrice).toHaveBeenCalled()
    expect(spyUpdateFilters).toHaveBeenCalledWith({ minPrice: 500 })
  })

  it('should call handleChangeCategory when user updates category filter', () => {
    const spyHandleChangeMinPrice = jest.spyOn(
      component,
      'handleChangeCategory'
    )

    const mockProductsService = TestBed.inject(ProductsService)
    const spyUpdateFilters = jest.spyOn(mockProductsService, 'updateFilters')

    const inputElement = fixture.debugElement.query(By.css('select'))
    inputElement.triggerEventHandler('input', { target: { value: 'laptops' } })

    expect(spyHandleChangeMinPrice).toHaveBeenCalled()
    expect(spyUpdateFilters).toHaveBeenCalledWith({ category: 'laptops' })
  })
})
