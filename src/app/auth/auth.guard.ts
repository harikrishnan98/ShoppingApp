import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService,private _router:Router){}

    canActivate(route:ActivatedRouteSnapshot,router: RouterStateSnapshot): boolean | UrlTree
     | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{

        return this.authService.user.pipe(
            take(1),
            map(user =>{

            const AuthUser= !!user;
            if(AuthUser){
                return true;
            }
            return this._router.createUrlTree(['/auth-page']);
         })
        //  ,tap(
        //      AuthInfo =>{
        //          if(!AuthInfo){
        //              this._router.navigate(['/auth-page']);

        //          }
        //      }
        //  )
         );

    }
}