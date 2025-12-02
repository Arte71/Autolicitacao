import { Injectable, signal } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { TodosComponent } from "../screens/todos/todos.component";
import { todo } from '../model/todo.entity';

@Injectable({
  providedIn: 'root',
})


export class TodosService {
  
    private readonly _items = signal<Array<todo>>([
        {id: crypto.randomUUID(), title: 'implementar App Mobile', completed: false},
        {id: crypto.randomUUID(), title: 'estudar angular avançado', completed: true},
        {id: crypto.randomUUID(), title: 'revisar código do preojeto', completed: false},
    

    ]);

    readonly items = this._items.asReadonly();

    toggle(id:string ) {
      this._items.update((items)=>
      items.map((item) =>
      item.id == id ? {...item, completed: !item.completed} : item
    )
  );
    } 
    remove(id: string) {
  this._items.update(items =>
    items.filter(item => item.id !== id)
  )};

  add(title: string) {
  const newTodo: todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  this._items.update(items => [...items, newTodo]);
}

}

