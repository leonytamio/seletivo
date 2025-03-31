import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { PessoaCardComponent } from '../../components/pessoa-card/pessoa-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PessoaCardComponent, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatIconModule, MatRadioModule, MatCardModule],
  templateUrl: './pessoa-lista.component.html',
})
export class PessoaListaComponent implements OnInit {
  pessoas: any[] = [];
  page = 0;
  pageSize = 10;
  filtro = '';
  
  searchParams: any;
  apiParams = {
    faixaIdadeFinal: 0,
    faixaIdadeInicial: 0,
    nome: '',
    porPagina: 10,
    sexo: 'Masculino',
    status: '',
    pagina:  1,
  }
  
  constructor(private pessoaService: PessoaService, private fb:UntypedFormBuilder) {

    this.searchParams = this.fb.group({
    faixaIdadeFinal: [''],
    faixaIdadeInicial: [''],
    nome: [''],
    sexo: [''],
    status: [''],
    });
  }

  get formControls() {
    return this.searchParams.controls;
  }
  
  ngOnInit(): void {
    this.loadPessoas();
  }
  
  loadPessoas(): void {
    this.pessoaService.getPessoas(this.apiParams).subscribe(res => { 
      this.pessoas = res["content"];
    });
  }

  onSearch(): void {
    this.apiParams.pagina = 0;
    this.apiParams.nome = ''
    this.loadPessoas();
  }

  nextPage(): void {
    this.apiParams.pagina++;
    this.loadPessoas();
  }

  prevPage(): void {
    if (this.apiParams.pagina > 0) {
        this.apiParams.pagina--;
      this.loadPessoas();
    }
  }

  clear() {
    this.searchParams.reset();
  }

  onSubmit() {
    this.apiParams.nome = this.searchParams.get('nome')?.value || '';
    this.apiParams.sexo = this.searchParams.get('sexo')?.value || '';
    this.apiParams.status = this.searchParams.get('status')?.value || '';
    this.loadPessoas();
  }
  
}
