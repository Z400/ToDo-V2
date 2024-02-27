import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { timestamp } from 'rxjs';
import { iListItems } from '../../../interface/iListItems';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef);


  @ViewChild('inputText') public inputText!: ElementRef;
  @Input ({required: true}) public inputListItems: iListItems[] = [];
  @Output() public outputAddListItems = new EventEmitter<iListItems>();

  public focusAndAddItem(value: string) {
    if(value){
      console.log(value);
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';


      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;
  
      this.outputAddListItems.emit({
        id,
        checked: false,
        value  
       });

        
       return this.inputText.nativeElement.focus();

    }
  
   
 
  
  }


}
