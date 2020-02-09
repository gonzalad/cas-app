import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Greetings } from './greetings.model';
import { Observable } from 'rxjs';

@Injectable()
export class GreetingsService {
    /**
     * Constructeur
     *
     * @param http Permet de faire des requêtes HTTP
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Méthode de recherche des personnes dans ElasticSearch
     *
     * @param rchMultiCriteres La requête multicritères à chercher
     * @param personne Les champs des personnes à chercher
     * @param police Les champs des polices à chercher
     */
    public greet(): Observable<Greetings> {
      return this.http.get<Greetings>(`/api/greetings`);
  }
}
