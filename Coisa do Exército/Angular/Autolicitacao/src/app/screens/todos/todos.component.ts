// src/app/screens/todos/todos.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TitleComponent } from '../../components/shared/title/title.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TodosService } from '../../services/todos.service.service';
import { MenuComponent } from '../../components/shared/menu/menu.component';
import { Licitacao } from '../../model/licitacoes.model';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-todos',
  standalone: true,
  // Limpando os imports
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TitleComponent, 
    CalendarComponent,
    MenuComponent,
    NgIf
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  // private readonly router = inject(Router);// 👈 REMOVIDO!
  private readonly fb = inject(FormBuilder);
  readonly todosService = inject(TodosService);
  readonly auth = inject(Auth);

  isModalOpen = signal(false);

  licitacaoForm = this.fb.group({
    tituloLicitacao: ['', Validators.required],
    descricao: [''],
    idResponsavel: ['', Validators.required],
  });

  constructor() {
    this.todosService.loadAllData();
  }

  // A função openDetails(id: string) não existe mais.

  openForm() {
    this.isModalOpen.set(true);
  }

  closeForm() {
    this.isModalOpen.set(false);
    this.licitacaoForm.reset();
  }

  async onSubmit() {
    if (this.licitacaoForm.valid) {
      const { tituloLicitacao, descricao, idResponsavel} = this.licitacaoForm.value;
      await this.todosService.add(tituloLicitacao!, descricao!, idResponsavel!);
      this.closeForm();
    }
  }
}