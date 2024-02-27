import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { iListItems } from '../../../interface/iListItems';
 
@Component({
  selector: 'app-input-list-items',
  standalone: true,
  imports: [],
  templateUrl: './input-list-items.component.html',
  styleUrl: './input-list-items.component.scss'
})
export class InputListItemsComponent {

  @Input({required: true}) public inputListItems: iListItems[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string,
    checked: boolean
    }>();

    public updateItemCheckbox (id: string, checked: boolean){
      return this.outputUpdateItemCheckbox.emit({id, checked});
    }

    @Output() public outputUpdateItemText = new EventEmitter<{
      id: string,
      value: string
      }>();
  
      public updateItemText (id: string, value: string){
        return this.outputUpdateItemText.emit({id, value});
      }

      @Output()public outputDeleteItemText = new EventEmitter<string>();

      public deleteItemText (id: string) {
        return this.outputDeleteItemText.emit(id);
      }

   
 

}
