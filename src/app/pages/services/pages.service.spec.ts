import { HttpClient } from '@angular/common/http';
import { PagesService } from './pages.service';
import { of } from 'rxjs';

describe('PagesService', () => {
  let service: PagesService;

  const mockHttpClient = {
    post: jasmine.createSpy('post'),
    
    get: jasmine.createSpy('get').and.returnValue(of(
      {
        results: [
          {
            id: 0,
            name: 'Carlos',
            status: 'Alive',
            species: 'string',
            type: 'string',
            gender: 'string',
            origin: {},
            Ilocation: {},
            image: 'string',
            episode: [],
            url: '',
            created: '',
          }
        ],
        favorites: []
      }
    )),

    delete: jasmine.createSpy('get').and.returnValue(of({})),

  };

  beforeEach(() => {
   //! PREPARO EL AMBIENTE DE PRUEBAS
    service = new PagesService(
      <HttpClient>(<unknown>mockHttpClient),
    )
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should test getCharacteres', () => {

    let obs$ = service.getCharacteres();
    obs$.subscribe( res => {
      expect(res).toBeDefined(); //! toBeDefined ==> EXISTA
    })
  });

  it('should test addFavorite', () => {
    mockHttpClient.post.and.returnValue(of({ ok: 'true' }));

    let obs$ = service.addFavorite({});
    obs$.subscribe( res => {
      expect(res).toBeDefined(); //! toBeDefined ==> EXISTA
    })
   
  });


  it('should test addFavorite BUT catchError', () => {

    mockHttpClient.post.and.returnValue(of({
      error: 'This is an error'
    }));


    let obs$ = service.addFavorite({});
    obs$.subscribe( res => {
      expect(res).toBeDefined(); //! toBeDefined ==> EXISTA
    })
   
  });
  
});
