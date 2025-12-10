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
import { Aprovarlicitacao } from './screens/aprovarlicitacao/aprovarlicitacao';
import path from 'node:path';

export const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register, canActivate: [RoleGuard], data: { roles: ['autoridade competente', 'admin'] } },
  { path: '', component: PageComponent }, 

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'licitacoes', component: Licitacoes },
      { path: 'minhaslicitacoes', component: Minhaslicitacoes },
      { path: 'pesqpreco', component: Pesqpreco },
      { path: 'relacao-itens/:nomeTabela', component: RelacaoItens },
      { path: 'faseinterna', component: Faseinterna },
      { path: 'preecher/:nomeTabela', component: Preencher },
      { path: 'gerardoc', component: Gerardoc },

      { 
        path: 'aprovarlicitacao',
        component: Aprovarlicitacao,
        canActivate: [RoleGuard],
        data: { expectedRole: 'autoridade competente' }
      },
    ],
  },
];
