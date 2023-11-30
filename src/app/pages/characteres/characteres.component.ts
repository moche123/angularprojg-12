import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character.interface';
import { Router } from '@angular/router';

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

  addFavorite(character: ICharacter){
      this._router.navigateByUrl('/pages/favorites');
  }
}
