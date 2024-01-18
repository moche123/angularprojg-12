import { Router } from '@angular/router';
import { CharacteresComponent } from './characteres.component';
import { PagesService } from '../services/pages.service';
import { of } from 'rxjs';
import { fakeAsync, flush } from '@angular/core/testing';

describe('CharacteresComponent', () => {
  let component: CharacteresComponent;

  const mockRouter = {

    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  let mockPagesService = {
    getCharacteres: jasmine.createSpy('getCharacteres').and.returnValue(of([])),
    addFavorite: jasmine.createSpy('addFavorite')
  }

  beforeEach(() => {
    component = new CharacteresComponent(
      <PagesService>(<unknown> mockPagesService ),
      <Router>(<unknown> mockRouter )
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * ngOnInit(): void {
    this.characteres$ = this._pagesService.getCharacteres()
  }
   */

  it('should test ngOnInit ', () => {
    component.ngOnInit()

    component.characteres$.subscribe((res)=> {
        expect(res).toBeDefined();
    })
  });


  it('should test addFavorite ', fakeAsync(() => {
    mockPagesService.addFavorite.and.returnValue(of(
      {
        ok: true
      }
    )
    ),

    component.addFavorite({
      id: 1,
      name: '',
      image: ''
    })

    flush();
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();

  }));


  it('should test addFavorite ok !== true', fakeAsync(() => {

    const spySwal = spyOn(component.swalObj,"fire")

    mockPagesService.addFavorite.and.returnValue(of(
      {
        ok: false
      }
    )
    ),

    component.addFavorite({
      id: 1,
      name: '',
      image: ''
    })
    flush();
    expect(spySwal).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/login');

  }));

});
