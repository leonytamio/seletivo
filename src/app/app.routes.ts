import { Routes } from '@angular/router';
import { PessoaListaComponent } from './pages/pessoa-lista/pessoa-lista.component';
import { PessoaDetalheComponent } from './pages/pessoa-detalhe/pessoa-detalhe.component';
import { PessoaInfoFormComponent } from './pages/pessoa-info-form/pessoa-info-form.component';

export const routes: Routes = [
  { path: '', component: PessoaListaComponent },
  { path: 'pessoa/:id', component: PessoaDetalheComponent },
  { path: 'pessoa/:id/info', component: PessoaInfoFormComponent }
];