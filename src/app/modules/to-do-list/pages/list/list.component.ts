import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { iListItems } from '../../../interface/iListItems';
import { JsonPipe } from '@angular/common';
import { InputListItemsComponent } from '../../components/input-list-items/input-list-items.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, JsonPipe, InputListItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

 public addItem = signal(true);

//Passo 1°. Adicionando na lista
 #setListItems = signal<iListItems[]>(this.parseItems());

//Paso 2°. Formando a leitura do passo 1°.
public getListItems = this.#setListItems.asReadonly();

 //Passo 3°. Retornando os dados da lista do localStorage!
 parseItems() {
  return JSON.parse(localStorage.getItem('@my-list') || '[]')
 }



 public getInputAndAddItem(value: iListItems) {
    //Adicionando ao local storage!
   localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems(), value])
   );

   return this.#setListItems.set(this.parseItems());

 }

 public listItemStage (value: 'pending' | 'completed') {

    return this.getListItems().filter((res: iListItems) => {
      if (value === 'pending')
      return !res.checked

      if (value === 'completed') {
      return res.checked
      }
      return res;

    } 
    )
 }

public updateItemCheckbox(newItem: {id:string; checked: boolean}) {
    this.#setListItems.update((oldValue: iListItems[]) => {
      return oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }
    return oldValue;
      }); 

     
 });
 return localStorage.setItem('my-list', JSON.stringify(this.#setListItems))

}



 public deleteAllItems () {

  Swal.fire({
    title: "Deseja deletar tudo?",
    text: "Após confirmado, as ledeções nao podem ser desfeitas!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, deletar tudo!",
  
  }).then((result) => {
    if (result.isConfirmed) {
     localStorage.removeItem('@my-list');
     return this.#setListItems.set(this.parseItems())
    }
  });

 }

 
public updateItemText(newItem: {id:string; value: string}) {
  this.#setListItems.update((oldValue: iListItems[]) => {
    return oldValue.filter((res) => {
      if (res.id === newItem.id) {
        res.value = newItem.value;
        return res;
      }
  return res;
    }); 
    
   return oldValue;
  });
  return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))


}

public deleteItemText (id: string){

  Swal.fire({
    title: "Deletar o item?",
    text: "Após confirmado essa ação não pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, deletar!",
    }).then((result) => {
    if (result.isConfirmed) {
      this.#setListItems.update((oldValue: iListItems[]) => {
        return oldValue.filter((res) => res.id !== id)
    });
    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))
  }
  });

  }

 


}
