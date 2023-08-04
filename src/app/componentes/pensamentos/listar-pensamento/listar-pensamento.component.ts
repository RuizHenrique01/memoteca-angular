import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos:Pensamento[] = [];
  paginaAtual = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual, this.filtro).subscribe((lista) => {
      this.listaPensamentos = lista
    });
  }

  carregarMaisPensamentos() {
    this.pensamentoService.listar(++this.paginaAtual, this.filtro).subscribe(pensamento => {
      this.listaPensamentos.push(...pensamento);

      if(!pensamento.length) {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamento(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.listar(this.paginaAtual, this.filtro).subscribe(pensamento => {
      this.listaPensamentos = pensamento;

      if(!pensamento.length) {
        this.haMaisPensamentos = false;
      }
    });
  }

}
