import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { TodosComponent } from '../../../screens/todos/todos.component';
import { Licitacoes } from '../../../screens/licitacoes/licitacoes';
import { Minhaslicitacoes } from '../../../screens/minhaslicitacoes/minhaslicitacoes';
import { CalendarComponent } from '../../../screens/calendar/calendar.component';


@Component({
  selector: 'app-menu',
  imports: [MenuItemComponent, TodosComponent, Licitacoes, Minhaslicitacoes, CalendarComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

}
