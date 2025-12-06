// src/app/screens/licitacoes/licitacoes.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { LicitacoesService } from '../../services/licitacoes.service';
import { Licitacao, TabelaItem } from '../../model/licitacoes.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
// aqui tu tem que dar o importe do teu seriço de autenticação
@Component({
  selector: 'app-licitacoes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink], 
  templateUrl: './licitacoes.html',
  styleUrls: ['./licitacoes.scss'],
})
export class Licitacoes implements OnInit {
  
  // Injeção do serviço de autenticação
  private readonly authService = inject(AuthService);
  
  licitacoes: Licitacao[] = [];
  selectedLicitacao?: Licitacao;
  selectedFile?: File;

  itemForm = signal<Partial<TabelaItem>>({
    descricao: '',
    quantidade_total: 0,
    catmat: '',
  });

  constructor(
    private licitacoesService: LicitacoesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    // 1. Obtém o ID do usuário do AuthService
    const currentUserId = this.authService.currentUserId(); 
    
    this.licitacoesService.getAll().subscribe((allLicitacoes) => {
      // 2. Aplica a filtragem: Exibir SOMENTE licitações onde o usuário não é responsável nem criador.
      this.licitacoes = allLicitacoes.filter(licitacao => 
        licitacao.IdResponsavel !== currentUserId && 
        licitacao.IdUsuario !== currentUserId
)
    });
  }

  selectLicitacao(licitacao: Licitacao): void {
    this.selectedLicitacao = licitacao;
  }

  addItem(): void {
    const formValue = this.itemForm();
    if (!formValue.descricao || (formValue.quantidade_total ?? 0) <= 0 || !formValue.catmat) {
      return;
    }

    if (!this.selectedLicitacao) {
      console.error('Licitação não selecionada!');
      return;
    }

    const newItem: TabelaItem = {
      itemId: (this.selectedLicitacao.items.length + 1).toString(),
      descricao: formValue.descricao,
      quantidade_total: formValue.quantidade_total,
      catmat: formValue.catmat,
    };

    this.licitacoesService.addItemToLicitacao(this.selectedLicitacao._id, newItem).subscribe((updatedLicitacao) => {
      this.selectedLicitacao = updatedLicitacao;
      this.itemForm.set({ descricao: '', quantidade_total: 0, catmat: '' });
    });
  }

  saveLicitacao(): void {
    if (this.selectedLicitacao) {
      this.licitacoesService.saveChanges(this.selectedLicitacao).subscribe();
    }
  }

  downloadFile(): void {
    const fileUrl = 'assets/arquivo_exemplo.odt';
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'arquivo_exemplo.odt';
    a.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/upload', formData).subscribe((response) => {
      console.log('Arquivo enviado com sucesso', response);
    });
  }
};