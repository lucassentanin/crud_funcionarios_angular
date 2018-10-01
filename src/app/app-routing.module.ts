import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component'
import { FuncionarioComponent } from './funcionarios/funcionario/funcionario.component'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'funcionarios/novo', component: FuncionarioComponent },
  { path: 'funcionarios/:id', component: FuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
