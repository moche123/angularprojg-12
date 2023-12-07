import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {

  public characteres$: Observable<ICharacter[]> = new Observable(); 
  
  constructor(
    private _pagesService:PagesService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.characteres$ = this._pagesService.getCharacteres()
  }

  addFavorite(character:any){
    const body = {
      IdCharacter: character.id,
      IdUser: localStorage.getItem('userId'),
      nameCharacter: character.name,
      caracterUrlImagen: character.image,
      token: localStorage.getItem('token')
    }

    this._pagesService.addFavorite(body).subscribe(res => {
      console.log(res)
      if(res.ok === true ){
        this._router.navigateByUrl('/pages/favorites');
      }else{
        Swal.fire(
          'Oops',
          res.msg || 'Error genérico',
          'error'
        )
        this._router.navigateByUrl('/auth/login');
      }
    })
  }
}
