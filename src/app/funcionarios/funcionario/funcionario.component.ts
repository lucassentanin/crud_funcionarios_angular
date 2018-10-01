import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FuncionarioService } from '../../funcionario.service';

declare var bootbox: any;

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  formulario: FormGroup;
  idFuncionario: number;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.formulario = new FormGroup({
      'nome': new FormControl('', [ Validators.required ]),
      'cpf': new FormControl('', [ Validators.required ]),
      'salario': new FormControl('', [ Validators.required ]),
    });
  }

  salvar() {
    let dadosDoFormulario = this.formulario.value;
    let funcionario: any = {
      nome: dadosDoFormulario.nome,
      cpf: dadosDoFormulario.cpf,
      salario: dadosDoFormulario.salario
    };
    if (this.idFuncionario) {
      this.funcionarioService
        .alterar(this.idFuncionario, funcionario)
        .subscribe(_ => {
          bootbox.alert('Funcionário alterado com sucesso!', () => {
            this.router.navigate(['/funcionarios']);
          });
        });
    } else {
      this.funcionarioService
        .cadastrar(funcionario)
        .subscribe(_ => {
          bootbox.alert('Funcionário cadastrado com sucesso!',
            this.router.navigate(['/funcionarios']));
        });
    }
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params =>{
        this.idFuncionario = params['id'];
        if (this.idFuncionario) {
          this.carregarDadosDoFuncionario();
        }
      });
  }

  carregarDadosDoFuncionario() {
    this.funcionarioService
      .buscarFuncionarioPeloId(this.idFuncionario)
      .subscribe(funcionario => {
        this.formulario.setValue({
          nome: funcionario.nome,
          cpf: funcionario.cpf,
          salario: funcionario.salario
        });
      });
  }

}
