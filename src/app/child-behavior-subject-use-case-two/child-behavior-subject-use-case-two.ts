import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-behavior-subject-use-case-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-behavior-subject-use-case-two.html',
  styleUrls: ['./child-behavior-subject-use-case-two.css']
})
export class ChildBehaviorSubjectUseCaseTwo {
  // @Input() receives data from parent; must be writable
  @Input() products: any[] = [];
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
