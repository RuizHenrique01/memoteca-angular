import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private pensamentoService: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((lista) => {
        this.listaPensamentos = lista;
      });
  }

  recarregarPensamentos() {
    this.haMaisPensamentos = true;
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  carregarMaisPensamentos() {
    this.pensamentoService
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamento) => {
        this.listaPensamentos.push(...pensamento);

        if (!pensamento.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamento() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamento) => {
        this.listaPensamentos = pensamento;

        if (!pensamento.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  listarFavoritos() {
    this.titulo = 'Favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamento) => {
        this.listaPensamentos = pensamento;
        this.listaFavoritos = pensamento;

        if (!pensamento.length) {
          this.haMaisPensamentos = false;
        }
      });
  }
}
