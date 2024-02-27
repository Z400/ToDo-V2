import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputAddItemComponent } from './modules/to-do-list/components/input-add-item/input-add-item.component';
import { InputListItemsComponent } from './modules/to-do-list/components/input-list-items/input-list-items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputListItemsComponent],
  template: `
  <router-outlet></router-outlet>`
})
export class AppComponent {
  
}
