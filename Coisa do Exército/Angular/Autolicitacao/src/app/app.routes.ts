import { Routes } from '@angular/router';
import { PageComponent } from './components/shared/page/page.component';
import { CalendarComponent } from './screens/calendar/calendar.component';
import { TodosComponent } from './screens/todos/todos.component';
import { Licitacoes } from './screens/licitacoes/licitacoes';
import { Minhaslicitacoes } from './screens/minhaslicitacoes/minhaslicitacoes';
import { LoginComponent } from './screens/login/login.component';
import { Register } from './screens/register/register';
import { Pesqpreco} from './screens/pesqpreco/pesqpreco';

export const routes: Routes = [

  { path: '', component: PageComponent }, // rota padrão
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'calendar', component: CalendarComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'licitacoes', component: Licitacoes},
  { path: 'minhaslicitacoes', component: Minhaslicitacoes},
  { path: 'pesqpreco', component: Pesqpreco}
  
];
