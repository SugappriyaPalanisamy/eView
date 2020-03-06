import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
       
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
      
        
        if (currentUser) {
            if (route.data.validatePermission) {
                if ( currentUser.permissions.findIndex(e => e.objectName === route.url[0].path)===-1) {
                    this.router.navigate(['/']);
                    return false;
                }
            }
            // authorised so return true
            return true;
        }
      
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        
    }
}