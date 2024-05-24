import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppButtonDirective } from './directives/app-button.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AppButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TobetoTask7';
}
