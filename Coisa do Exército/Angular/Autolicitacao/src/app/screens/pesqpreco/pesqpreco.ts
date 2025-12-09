import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { MenuComponent } from '../../components/shared/menu/menu.component';

@Component({
  selector: 'app-pesqpreco',
  imports: [CommonModule,
    MenuComponent
  ],
  templateUrl: './pesqpreco.html',
  styleUrl: './pesqpreco.css'
})
export class Pesqpreco {
  selectedFile: File | null = null;

  constructor(private _http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf_file', this.selectedFile);

      this._http.post('http://localhost:5000/pesquisa_preco', formData, 
        { responseType: 'blob' 
        }).subscribe((response: Blob) => {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          a.href = url;
          a.download = 'resultado.csv';
          a.click();
          window.URL.revokeObjectURL(url);
        }, error  => { 
          console.error('Erro ao enviar o arquivo:', error);
        });
    }
  }
}
