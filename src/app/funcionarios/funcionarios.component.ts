import { Component, OnInit } from '@angular/core';

import Funcionario from './funcionario';
import { FuncionarioService } from '../funcionario.service';

declare var bootbox: any;

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionario[];

  constructor(private funcionarioService: FuncionarioService) { }

  excluir(funcionario: Funcionario) {
    bootbox.confirm({
      size: "small",
      message: "Deseja realmente excluir o funcionário?",
      callback: confirmou => {
        if (confirmou) {
          this.efetuarRequisicaoDeExclusao(funcionario.id);
        }
      }
    })
  }

  efetuarRequisicaoDeExclusao(id: number) {
    this.funcionarioService
      .excluirFuncionario(id)
      .subscribe(_ => {
        bootbox.alert(
          "Funcionário excluído com sucesso",
          () => this.carregarFuncionarios());
      });
  }

  ngOnInit() {
    this.carregarFuncionarios();
  }

  private carregarFuncionarios() {
    this.funcionarioService
      .buscarTodos()
      .subscribe(funcionarios => {
        this.funcionarios = funcionarios
      });
  }

}
