// src/app/screens/todos/todos.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TitleComponent } from '../../components/shared/title/title.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TodosService } from '../../services/todos.service.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleComponent, CalendarComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly todosService = inject(TodosService);

  isModalOpen = signal(false);

  licitacaoForm = this.fb.group({
    titulo: ['', Validators.required],
    mensagem: [''],
    responsavel: ['', Validators.required]
  });

  // Carrega os dados do backend na inicialização
  constructor() {
    this.todosService.loadAllData();
  }

  openDetails(id: string) {
    // A rota deve ser configurada no seu ficheiro de rotas
    this.router.navigate(['/generetes/relacao-itens', id]);
  }

  openForm() {
    this.isModalOpen.set(true);
  }

  closeForm() {
    this.isModalOpen.set(false);
    this.licitacaoForm.reset();
  }

  async onSubmit() {
    if (this.licitacaoForm.valid) {
      const { titulo, mensagem, responsavel } = this.licitacaoForm.value;
      
      // Espera o Service enviar e receber a confirmação do backend
      await this.todosService.add(titulo!, mensagem!, responsavel!);
      
      this.closeForm();
    }
  }
}