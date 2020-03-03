import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData{


    idToken: string;
    email : string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : string;


    
}

@Injectable({providedIn:'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer :any;


    constructor(private http:HttpClient,private router:Router){

    }

    signup(email:string,password:string){

       return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7YEL9yMSntgXArg6WVXLkYzDUg02PSPw'
       ,
        {
            email: email,
            password: password,
            returnSecureToken: true

        }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData =>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);

            }

            )
        );
        

        
    }

    autologin(){

        const userDetails:{

            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userDetails){
            return;
        }

        const loadUser = new User
        (userDetails.email,
            userDetails.id,
            userDetails._token,
            new Date(userDetails._tokenExpirationDate)
        );
        
        if(loadUser.token){
            this.user.next(loadUser);
            const expirationDuration = 
            new Date(userDetails._tokenExpirationDate).getTime()-
            new Date().getTime();
            this.autologout(expirationDuration);
        }
    }

    login(email:string,password:string){

       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7YEL9yMSntgXArg6WVXLkYzDUg02PSPw',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData =>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);

            }

            )
        );
        

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth-page']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;   
    }

    autologout(expirationDuration: number){
        console.log(expirationDuration);

      this.tokenExpirationTimer=  setTimeout(
            ()=>{
              this.logout();
            },
            expirationDuration
        );
    }

    private handleAuthentication(email: string,userId:string, token:string, expiresIn: number){

        const expirationDate = new Date(new Date().getTime()  +   +expiresIn *1000);
        
        const userData = new User(email,userId,token,expirationDate);

        this.user.next(userData);
        this.autologout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(userData))








    }

    private handleError(errorRes: HttpErrorResponse){

        console.log(errorRes);

        
            let errorMessage = "An unknown error occured!";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){

                case 'EMAIL_EXISTS':
                  errorMessage ="Email Already Exists.....!";
                  break;
                
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "Email-NOT-FOUND";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "Incorrect Password Try Again...!";
                    break;

               }

               return throwError(errorMessage);

        }

    }

