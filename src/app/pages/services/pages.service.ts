import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IApiResult, ICharacter } from '../interfaces/character.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable()
export class PagesService {
  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getCharacteres(): Observable<ICharacter[]>{
    return this._http
      .get<IApiResult>('https://rickandmortyapi.com/api/character/')
      .pipe(map((el: any) => el.results));
  }

  addFavorite(body: any): Observable<any> {
    const url = `${this.baseUrl}/api/favorite/newFavorite`;

    return this._http.post<any>(url, body)
      .pipe(
        map(resp => {
          if(resp.error){
            throw new Error('No condition achieved');
          }
          return resp
        }),
        catchError(err => {
                    
          Swal.fire(
            'Oops',
            err?.error?.msg || 'Error no condition achieved',
            'error'
          )
          return of(err.error || 'Error no condition achieved')
        })
      )
  }


  getFavorites(): Observable<any[]> {
    const url = `${this.baseUrl}/api/favorite/${localStorage.getItem('userId')}`;

    return this._http.get(url)
      .pipe(
        map((response: any) => {
          return response.favorites
        })
      )
  }

  deleteFavorite(IdCharacter:any,IdUser:any): Observable<any> {

    const url = `${this.baseUrl}/api/favorite/deleteFavorite`;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { IdCharacter,IdUser }, };
    // const headers = new HttpHeaders().set(IdCharacter.toString(),IdUser)
    
    return this._http.delete<any>(url,options)
      
      
  }
}
