import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, firstValueFrom } from 'rxjs';
import { vi } from 'vitest';

import { ApiProductCategory } from './api-product-category';
import { ApiProductCategoryService, Product } from '../api-product-category-service';

describe('ApiProductCategory (Vitest)', () => {
  let component: ApiProductCategory;
  let fixture: ComponentFixture<ApiProductCategory>;
  let service: ApiProductCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiProductCategory],
      providers: [
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiProductCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();     // run initial change detection
    await fixture.whenStable();  // wait for async bindings
    service = TestBed.inject(ApiProductCategoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedCategory when onCategorySelected is called', () => {
    const category = 'electronics';
    component.onCategorySelected(category);
    expect(component.selectedCategory).toBe(category);
  });

  it('should fetch products when category is selected', async () => {
    const category = 'electronics';
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category, image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category, image: 'image2.jpg' }
    ];

    vi.spyOn(service, 'getProductsByCategory').mockReturnValue(of(mockProducts));

    component.onCategorySelected(category);

    const result = await firstValueFrom(component.products$);

    expect(result).toEqual(mockProducts);
    expect(service.getProductsByCategory).toHaveBeenCalledWith(category);
  });
});
