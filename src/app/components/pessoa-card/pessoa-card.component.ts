import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pessoa } from '../../models/pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pessoa-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pessoa-card.component.html',
})
export class PessoaCardComponent {
  @Input() pessoa!: Pessoa;

  ngOnInit() { }

  PessoaSemFoto(): string {    
    if (!this.pessoa.urlFoto)
      return "../assets/img/no-photo.svg";
    return this.pessoa.urlFoto;
  }

  updateUrlError() {
    this.pessoa.urlFoto = "../assets/img/no-photo.svg";
  }

}