import { Component } from '@angular/core';
import { AppButtonDirective } from '../directives/app-button.directive';

@Component({
  selector: 'app-directive-examples',
  standalone: true,
  imports: [AppButtonDirective],
  template: `<button appButton>Hover me</button>`,
})
export class DirectiveExamplesComponent {

}
