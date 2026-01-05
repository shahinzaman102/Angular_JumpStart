import { TestBed } from '@angular/core/testing';
import { ApiProductCategoryService } from './api-product-category-service';
import { HttpClient } from '@angular/common/http';
import { of, firstValueFrom } from 'rxjs';
import { vi } from 'vitest';

describe('ApiProductCategoryService', () => {
  let service: ApiProductCategoryService;
  let httpClientSpy: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    httpClientSpy = { get: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ApiProductCategoryService,
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });

    service = TestBed.inject(ApiProductCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL', async () => {
    const category = 'electronics';
    const expectedResponse = [
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'electronics', image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'electronics', image: 'image2.jpg' }
    ];

    httpClientSpy.get.mockReturnValue(of(expectedResponse));

    const result = await firstValueFrom(
      service.getProductsByCategory(category)
    );

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/category/${category}`
    );
    expect(result).toEqual(expectedResponse);
  });
});
