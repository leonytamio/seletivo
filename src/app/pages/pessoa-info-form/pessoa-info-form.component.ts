import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { PessoaService } from '../../services/pessoa.service';
import { InfoSubmission } from '../../models/pessoa';

@Component({
  selector: 'app-pessoa-info-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './pessoa-info-form.component.html',
})
export class PessoaInfoFormComponent implements OnInit {
  pessoaId: number;
  info: InfoSubmission = { informacao: '', localVisto: '', dataVisto: '' };

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService) {
    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    this.info.foto = event.target.files[0];
  }

  submit(): void {
    const formData = new FormData();
    formData.append('informacao', this.info.informacao);
    formData.append('localVisto', this.info.localVisto);
    formData.append('dataVisto', this.info.dataVisto);
    if (this.info.foto) formData.append('foto', this.info.foto);

    this.pessoaService.submitInfo(this.pessoaId, formData).subscribe(() => {
      alert('Informações enviadas com sucesso!');
    });
  }
}