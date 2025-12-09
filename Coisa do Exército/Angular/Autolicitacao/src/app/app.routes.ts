import { Routes } from '@angular/router';
import { PageComponent } from './components/shared/page/page.component';
import { CalendarComponent } from './screens/calendar/calendar.component';
import { TodosComponent } from './screens/todos/todos.component';
import { Licitacoes } from './screens/licitacoes/licitacoes';
import { Minhaslicitacoes } from './screens/minhaslicitacoes/minhaslicitacoes';
import { LoginComponent } from './screens/login/login.component';
import { Register } from './screens/register/register';
import { Pesqpreco} from './screens/pesqpreco/pesqpreco';
import { Auth } from './services/auth';
import { AuthGuard } from './services/auth-guard';
import { RelacaoItens } from './generetes/relacao-itens/relacao-itens';
import { Faseinterna } from './screens/faseinterna/faseinterna';
import { Preencher } from './generetes/preencher/preencher';
import { RoleGuard } from './services/role-guard';
import { Gerardoc } from './screens/gerardoc/gerardoc';

export const routes: Routes = [

  { path: '', component: PageComponent }, // rota padrão
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'calendar', component: CalendarComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'licitacoes', component: Licitacoes, canActivate: [AuthGuard] },
  { path: 'minhaslicitacoes', component: Minhaslicitacoes, canActivate: [AuthGuard] },
  { path: 'pesqpreco', component: Pesqpreco},
  { path: 'minhaslicitacoes', component: Minhaslicitacoes},
  {path: 'relacao-itens/:nomeTabela', component: RelacaoItens},
  {path: 'faseinterna', component: Faseinterna},
  {path: 'preecher/:nomeTabela', component: Preencher},
  { path: 'gerardoc', component: Gerardoc}

  
];
