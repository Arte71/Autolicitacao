import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TabelaItem } from '../../model/licitacoes.model';

@Component({
  selector: 'app-gerardoc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerardoc.html',
  styleUrl: './gerardoc.scss',
})
export class Gerardoc {
  
  private apiUrl = 'http://localhost:5000/gerar_doc';
  private salvarItemUrl = 'http://localhost:27071/api/tabelaitens';

  itens: TabelaItem[] = [
    {
      _id: '',
      itemId: '',
      tableName: '',
      descricao: '',
      unidadeMedida: '',
    }
  ];

  constructor(private http: HttpClient) {}

  adicionarItem() {
    this.itens.push({
      _id: '',
      itemId: '',
      descricao: '',
      unidadeMedida: '',
    });
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }

  salvarDados() {
    console.log('Salvando dados:', this.itens);
    this.http.post(this.salvarItemUrl, this.itens)
      .subscribe({
        next: (response) => console.log('Dados salvos com sucesso', response),
        error: (err) => console.error("Erro ao salvar dados", err)
      });
  }

  enviarDados() {
    console.log('Enviando dados:', this.itens);
    this.http.post(this.apiUrl, this.itens, { responseType: 'blob' })
      .subscribe({
        next: (arquivo) => this.baixarArquivo(arquivo),
        error: (err) => console.error("Erro ao gerar documento", err)
      });
  }

private baixarArquivo(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'documento.docx';
  a.click();
  window.URL.revokeObjectURL(url);
  }

}
