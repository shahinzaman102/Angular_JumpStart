import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-behavior-subject-use-case-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-behavior-subject-use-case-three.html',
  styleUrls: ['./child-behavior-subject-use-case-three.css']
})
export class ChildBehaviorSubjectUseCaseThree implements OnDestroy {
  protected loggedIn = false;
  private subscription!: Subscription;

  private authService = inject(AuthService);

  constructor() {
    this.subscription = this.authService.getLoginStatus().subscribe(
      status => this.loggedIn = status
    );
  }

  protected logout() {
    // Update login status
    this.authService.setLoginStatus(false);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
