import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favorites$: Observable<any[]> = new Observable();

  constructor(
    private _pagesService: PagesService,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this.favorites$ = this._pagesService.getFavorites()
  }

  deleteFavorite(character:any){
    this._pagesService.deleteFavorite(character.IdCharacter,character.IdUser).subscribe(res => {
      Swal.fire({
        title: 'Enhorabuena!',
        text: 'Favorito retirado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this._router.navigateByUrl('/pages/characteres')
    })
  }
}
