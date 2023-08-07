import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './Pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3333/pensamentos';

  constructor(private http: HttpClient) {}

  listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    const intesPorPagina = 6;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', intesPorPagina);

    if (filtro.length >= 2) {
      params = params.set('q', filtro);
    }

    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const URL = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(URL, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(URL);
  }

  mostrar(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.get<Pensamento>(URL);
  }
}
