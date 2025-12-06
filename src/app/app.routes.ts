import { Routes } from '@angular/router';
import { PageComponent } from './components/shared/page/page.component';
import { CalendarComponent } from './screens/calendar/calendar.component';
import { TodosComponent } from './screens/todos/todos.component';
import { Licitacoes } from './screens/licitacoes/licitacoes';
import { Minhaslicitacoes } from './screens/minhaslicitacoes/minhaslicitacoes';
import { RelacaoItens } from './generetes/relacao-itens/relacao-itens';

export const routes: Routes = [

     { path: '', component: TodosComponent }, // rota padrão
  { path: 'calendar', component: CalendarComponent },
  { path: 'todos', component: TodosComponent },
  {path: 'licitacoes', component: Licitacoes},
  {path: 'minhaslicitacoes', component: Minhaslicitacoes},
  {path: 'relacao-itens', component: RelacaoItens}
  
];
