// src/app/screens/preencher/preencher.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../../services/licitacoes.service'; 
import { TabelaItem } from '../../model/licitacoes.model'; 
import { Pesqpreco } from '../../screens/pesqpreco/pesqpreco'; 
import { lastValueFrom, Observable } from 'rxjs'; // lastValueFrom para async/await

@Component({
  selector: 'app-preencher',
  standalone: true,
  imports: [CommonModule, Pesqpreco],
  templateUrl: './preencher.html',
  styleUrl: './preencher.scss',
})
export class Preencher implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly licitacoesService = inject(LicitacoesService);

  nomeTabela: string = '';
  itensTabela: TabelaItem[] = [];
  isLoading: boolean = true;
  
  colunasVisiveis: string[] = []; 
  selectedFile: File | null = null; 
  isUploading: boolean = false; 
  
  readonly caminhoModeloArquivo: string = 'assets/modelo/modelo_de_arquivo.xlsx'; 
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nomeTabelaParam = params.get('nomeTabela');
      if (nomeTabelaParam) {
        this.nomeTabela = nomeTabelaParam;
        this.loadItens();
      } else {
        this.isLoading = false;
        console.error('Parâmetro nomeTabela não encontrado na rota.');
      }
    });
  }

  loadItens(): void {
    this.isLoading = true;
    this.licitacoesService.getItensByTableName(this.nomeTabela).subscribe({
      next: (data) => {
        this.itensTabela = data.map(item => this.processItem(item));
        
        // GERAÇÃO DINÂMICA DAS COLUNAS
        if (this.itensTabela.length > 0) {
            this.colunasVisiveis = Object.keys(this.itensTabela[0]);
        } else {
            // Cabeçalho padrão caso a lista esteja vazia
            this.colunasVisiveis = ['itemId', 'descricao', 'catmat', 'quantidade_total'];
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar itens da tabela:', err);
        this.isLoading = false;
        this.itensTabela = []; 
        this.colunasVisiveis = ['itemId', 'descricao', 'catmat', 'quantidade_total'];
      }
    });
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file || null;
  }
  
  async handleFileUpload(): Promise<void> {
    if (!this.selectedFile || !this.nomeTabela) {
      console.error('Arquivo ou nome da tabela ausente.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('nomeTabela', this.nomeTabela); 

    const uploadUrl = 'http://localhost:3000/api/upload-itens'; 
    
    try {
      const response = await lastValueFrom(
        this.licitacoesService.uploadFile(uploadUrl, formData) // Chama o método do serviço
      );
      
      console.log('Upload bem-sucedido:', response);
      alert('Arquivo enviado com sucesso!');
      this.loadItens(); // Recarrega os dados para exibir os itens importados
      
    } catch (error) {
      console.error('Erro durante o upload do arquivo:', error);
      alert('Falha ao enviar o arquivo. Verifique o console.');
    } finally {
      this.isUploading = false;
      this.selectedFile = null; 
    }
  }

  processItem(item: TabelaItem): TabelaItem {
    return Object.entries(item).reduce((acc, [key, value]) => {
        const processedValue = (value === null || value === undefined) ? 0 : value;
        acc[key as keyof TabelaItem] = processedValue as any; 
        return acc;
    }, { ...item } as TabelaItem); 
  }

  downloadModelo(): void {
    console.log('Caminho para download do modelo:', this.caminhoModeloArquivo);
  }
}