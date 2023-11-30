import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResult, ICharacter } from '../interfaces/character.interface';

@Injectable()
export class PagesService {
  constructor(private _http: HttpClient) {}

  getCharacteres(): Observable<ICharacter[]>{
    return this._http
      .get<IApiResult>('https://rickandmortyapi.com/api/character/')
      .pipe(map((el: any) => el.results));
  }

}
