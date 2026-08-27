import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, 
  JsonPipe, KeyValuePipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { Observable, timer, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileSizePipe } from './pipes/file-size.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

interface OrderSummary {
  id: string;
  customer: string;
  total: number;
  discount: number;
  createdAt: Date;
  metadata: Record<string, string>;
}

interface ServerStatus {
  online: boolean;
  activeUsers: number;
  uptimeSeconds: number;
}

@Component({
  selector: 'app-pipes-use-cases',
  imports: [
    // Built-in Pipes
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    TitleCasePipe,
    KeyValuePipe,
    JsonPipe,
    // Custom Pipes
    FileSizePipe,
    TimeAgoPipe
  ],
  templateUrl: './pipes-use-cases.html',
  styleUrl: './pipes-use-cases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do NOT set `OnPush` explicitly cause it's the default in Angular v22+.
  // We've set to provide clarity..
})
export class PipesUseCases {
  // Practical Built-In Pipe Data
  protected readonly order = signal<OrderSummary>({
    id: 'ORD-8921',
    customer: 'john doe',
    total: 249.99,
    discount: 0.15,
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    metadata: {
      fulfillment: 'Express Delivery',
      warehouse: 'US-East-1',
      status: 'In Transit',
    },
  });

  // Practical AsyncPipe Example: Live Server Status Polling
  protected readonly serverStatus$: Observable<ServerStatus> = timer(0, 5000).pipe(
    map((tick) => ({
      online: true,
      activeUsers: 1420 + tick * 3,
      uptimeSeconds: 86400 + tick * 5,
    })),
    catchError(() => of({ online: false, activeUsers: 0, uptimeSeconds: 0 }))
  );

  // Practical Custom Pipe Data
  protected readonly downloads = signal([
    { name: 'Angular_v22_CheatSheet.pdf', bytes: 2450821, uploadedAt: new Date(Date.now() - 1000 * 60 * 12) },
    { name: 'Architecture_Diagram.png', bytes: 842100, uploadedAt: new Date(Date.now() - 1000 * 3600 * 5) },
    { name: 'Dataset_Export.csv', bytes: 104857600, uploadedAt: new Date(Date.now() - 1000 * 86400 * 2) },
  ]);
}