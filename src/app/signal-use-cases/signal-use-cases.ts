import { Component, computed, effect, inject, PLATFORM_ID, signal, resource, 
  linkedSignal, viewChild, ElementRef, ChangeDetectionStrategy,
  injectAsync,
  onIdle} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { SignalStateService } from '../signal-state';
import { SignalChildComponent } from '../signal-child/signal-child';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-signal-use-cases',
  imports: [SignalChildComponent],
  templateUrl: './signal-use-cases.html',
  styleUrl: './signal-use-cases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set `OnPush` explicitly cause it's the default in Angular v22+.
  // We've set to provide clarity..
})
export class SignalUseCases {
  private readonly stateService = inject(SignalStateService);
  private readonly platformId = inject(PLATFORM_ID);

  // ============================================================
  // 1. LOCAL COMPONENT STATE
  // ============================================================
  protected readonly message = signal('');
  protected readonly count = signal(0);

  protected updateMessage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }

  protected increment(): void {
    this.count.update(n => n + 1);
  }

  protected decrement(): void {
    this.count.update(n => n - 1);
  }

  protected resetCount(): void {
    this.count.set(0);
  }

  // ============================================================
  // 2. SHARED STATE ACROSS COMPONENTS (Service Signal)
  // ============================================================
  protected readonly sharedMessage = this.stateService.message;

  protected shareState(): void {
    this.stateService.setMessage(this.message());
  }

  // ============================================================
  // 3. COMPONENT COMMUNICATION (input, output, model)
  // ============================================================
  protected readonly childMessageLog = signal('');
  protected readonly parentModelValue = signal('Parent Initial Data');

  protected updateParentModelValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.parentModelValue.set(input.value);
  }

  protected handleChildEvent(message: string): void {
    this.childMessageLog.set(message);
  }

  // ============================================================
  // 4. DERIVED STATE
  // ============================================================
  protected readonly products = signal<Product[]>([
    { id: 1, title: 'Angular Book', price: 50, category: 'Books' },
    { id: 2, title: 'Angular Course', price: 100, category: 'Courses' },
    { id: 3, title: 'RxJS Book', price: 40, category: 'Books' },
    { id: 4, title: 'TypeScript Course', price: 80, category: 'Courses' }
  ]);

  protected readonly searchTerm = signal('');

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  protected readonly filteredProducts = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    if (!search) return this.products();

    return this.products().filter(p =>
      p.title.toLowerCase().includes(search)
    );
  });

  protected readonly totalPrice = computed(() =>
    this.filteredProducts().reduce((sum, item) => sum + item.price, 0)
  );

  protected readonly hasProducts = computed(() =>
    this.filteredProducts().length > 0
  );

  // ============================================================
  // 5. REACTIVE SIDE EFFECTS
  // ============================================================
  protected readonly theme = signal<'light' | 'dark'>('light');

  // Inline effect field initializer (completely removes the constructor)
  private readonly _themeLogger = effect(() => {
    const currentTheme = this.theme();
    console.log('Theme changed to:', currentTheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', currentTheme);
    }
  });

  protected toggleTheme(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  // ============================================================
  // 6. ASYNC HTTP STATE MANAGEMENT USING HTTPRESOURCE
  // ============================================================
  protected readonly httpSearchTerm = signal('');

  protected updateHttpSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.httpSearchTerm.set(input.value);
  }

  protected readonly productsResource = httpResource<Product[]>(
    () => 'https://fakestoreapi.com/products',
    { defaultValue: [] }
  );

  protected readonly searchedProducts = computed(() => {
    const products = this.productsResource.value();
    const term = this.httpSearchTerm().trim().toLowerCase();

    if (!term) return products.slice(0, 5);

    return products.filter(
      p =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  });

  // ============================================================
  // 7. GENERIC ASYNC STATE MANAGEMENT USING RESOURCE
  // ============================================================
  protected readonly sdkSearchTerm = signal('');

  protected updateSdkSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.sdkSearchTerm.set(input.value);
  }

  protected readonly sdkUserResource = resource({
    params: () => this.sdkSearchTerm(),
    loader: async ({ params: query }) => {
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUsers = [
        { id: 1, name: 'Alice Smith' },
        { id: 2, name: 'Bob Jones' },
        { id: 3, name: 'Charlie Brown' }
      ];

      const term = query.trim().toLowerCase();
      if (!term) return mockUsers;

      return mockUsers.filter(u => u.name.toLowerCase().includes(term));
    }
  });

  // ============================================================
  // 8. LINKED SIGNALS (Resetting / Writable Derived State)
  // ============================================================
  protected readonly selectedCategory = signal<'Electronics' | 'Clothing'>('Electronics');

  // Modern shorthand syntax with explicit <string> type
  protected readonly selectedItem = linkedSignal<string>(() =>
    this.selectedCategory() === 'Electronics' ? 'Laptop' : 'Shirt'
  );

  protected selectCategory(category: 'Electronics' | 'Clothing'): void {
    this.selectedCategory.set(category); // Automatically resets selectedItem!
  }

  protected setCustomItem(item: string): void {
    this.selectedItem.set(item); // Works cleanly!
  }

  // ============================================================
  // 9. SIGNAL VIEW QUERIES (viewChild)
  // ============================================================
  // Modern signal-based view query returning Signal<ElementRef<HTMLInputElement> | undefined>
  protected readonly searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected focusSearchInput(): void {
    // Accessing the element via Signal getter .value/direct call
    this.searchInputElement()?.nativeElement.focus();
  }

  // ============================================================
  // 10. DEFERRED LOADING (@defer with Signals)
  // ============================================================
  protected readonly showHeavyComponent = signal(false);

  protected loadHeavyComponent(): void {
    this.showHeavyComponent.set(true);
  }

  // ============================================================
  // 11. LAZY-LOADED SERVICE (injectAsync)
  // ============================================================
  // ReportExportService is not fetched until exportProducts() is called
  // for the first time — its module is split into a separate chunk.
  private readonly exportService = injectAsync(
    () => import('../report-export').then(m => m.ReportExportService),
    { prefetch: onIdle } // optionally start loading in the background once idle
  );

  protected readonly exportStatus = signal<string>('Not exported yet');
  protected readonly isExporting = signal(false);

  protected async exportProducts(): Promise<void> {
    this.isExporting.set(true);
    try {
      const service = await this.exportService(); // triggers dynamic import on first call
      const result = await service.exportData(this.filteredProducts());
      this.exportStatus.set(result);
    } finally {
      this.isExporting.set(false);
    }
  }
}
