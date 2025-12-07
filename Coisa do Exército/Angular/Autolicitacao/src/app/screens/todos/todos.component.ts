import { Component, inject } from '@angular/core';
import { TitleComponent } from '../../components/shared/title/title.component';
import { TodosService } from '../../services/todos.service.service';


@Component({
  selector: 'app-todos',
  imports: [TitleComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  readonly todos = inject(TodosService);

  addTodo(event: Event, input: HTMLInputElement) {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  this.todos.add(title);

  input.value = '';
}

}
