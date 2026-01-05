import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = 'Angular_JumpStart';
}

// RouterOutlet vs RouterModule --> 
// - RouterOutlet = only a view placeholder.
// - RouterModule = enables routing logic + provides RouterOutlet.
