import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input()
  pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: true,
  };

  @Input()
  listaFavoritos: Pensamento[] = [];

  constructor(private pensamentoService: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  ativarFavorito() {
    this.pensamentoService.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }

  habilitarFavorito(): string {
    if (this.pensamento.favorito) {
      return 'ativo';
    }

    return 'inativo';
  }
}
