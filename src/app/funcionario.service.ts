import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment'
import Funcionario from './funcionarios/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  alterar(id: number, funcionario: Funcionario): Observable<Object> {
    return this.http
      .put(`${environment.apiBaseUrl}funcionarios/${id}`, funcionario);
  }

  cadastrar(funcionario: Funcionario): Observable<Object> {
    return this.http
      .post(`${environment.apiBaseUrl}funcionarios/`, funcionario);
  }

  buscarFuncionarioPeloId(id: number): Observable<Funcionario> {
    return this.http
      .get(`${environment.apiBaseUrl}funcionarios/${id}`)
      .pipe(map(x => <Funcionario>x));
  }

  buscarTodos(): Observable<Funcionario[]> {
    return this.http
      .get(`${environment.apiBaseUrl}funcionarios/`)
      .pipe(map(x => <Funcionario[]>x)); 
  }

  excluirFuncionario(id: number): Observable<Object> {
    return this.http
      .delete(`${environment.apiBaseUrl}funcionarios/${id}`);
  }

}
