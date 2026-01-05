import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../api-product-category-service';

@Component({
  selector: 'app-child-behavior-subject-use-case-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-behavior-subject-use-case-two.html',
  styleUrls: ['./child-behavior-subject-use-case-two.css']
})
export class ChildBehaviorSubjectUseCaseTwo {
  // @Input() receives data from parent; must be writable
  @Input() products: Product[] = [];
  // Better: use a typed interface
  // @Input() products: Product[] = [];
  // interface Product {
  //   id: number;
  //   name: string;
  //   description: string;
  //   price: number;
  // }

  // Parent ↔ Child communication:
  // @Input(): Parent → Child
  // @Output(): Child → Parent
}
