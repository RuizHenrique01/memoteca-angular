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

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual).subscribe((lista) => {
      this.listaPensamentos = lista
    });
  }

  carregarMaisPensamentos() {
    this.pensamentoService.listar(++this.paginaAtual).subscribe(pensamento => {
      this.listaPensamentos.push(...pensamento);

      if(!pensamento.length) {
        this.haMaisPensamentos = false;
      }
    });
  }

}
