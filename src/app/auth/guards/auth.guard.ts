import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard  {
  constructor(private injector: Injector) {}

  canActivate(): boolean {
    const oauthService: AuthService = this.injector.get(AuthService);

    if (!oauthService.isLoggedIn()) { //! NO CUENTA CON LOGUEO?
      return true;
    }
    
    oauthService.goToPages();
    return false;
  }
}