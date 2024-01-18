import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard  {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {

    if (!this.authService.isLoggedIn()) { //! NO CUENTA CON LOGUEO?
      return true;
    }
    
    this.authService.goToPages();
    return false;
  }
}