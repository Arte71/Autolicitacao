import { Component, OnInit, signal } from '@angular/core';
import { LicitacoesService } from '../../services/licitacoes.service';
import { Licitacao, TabelaItem } from '../../model/licitacoes.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-licitacoes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],  // Importando FormsModule corretamente
  templateUrl: './licitacoes.html',
  styleUrls: ['./licitacoes.scss'],
})
export class Licitacoes implements OnInit {
  licitacoes: Licitacao[] = [];
  selectedLicitacao?: Licitacao;
  selectedFile?: File;

  // Usando Signal para a entrada de dados do usuário
  itemForm = signal<{ descricao: string; quantidade_total: number; catmat: string }>({
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
    this.licitacoesService.getAll().subscribe((licitacoes) => {
      this.licitacoes = licitacoes;
    });
  }

  selectLicitacao(licitacao: Licitacao): void {
    this.selectedLicitacao = licitacao;
  }

  addItem(): void {
    if (!this.itemForm().descricao || this.itemForm().quantidade_total <= 0 || !this.itemForm().catmat) {
      return;
    }

    if (!this.selectedLicitacao) {
      console.error('Licitação não selecionada!');
      return;
    }

    const newItem: TabelaItem = {
      itemId: (this.selectedLicitacao.items.length + 1).toString(),
      descricao: this.itemForm().descricao,
      quantidade_total: this.itemForm().quantidade_total,
      catmat: this.itemForm().catmat,
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
}
