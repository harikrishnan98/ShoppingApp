import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({

     selector: 'app-header',
     templateUrl: './header.component.html'
     


})


export class HeaderComponent implements OnInit,OnDestroy{

     
    private userSub:Subscription;
    isAuthenticate = false;

     constructor(private dataservice:DataStorageService, private authservice:AuthService){

     }

     ngOnInit(){
       this.userSub = this.authservice.user.subscribe(user =>{

          this.isAuthenticate = !!user;
          console.log(!user);
          console.log(!!user);
       });
       


     }

 
     onSave(){

          this.dataservice.storeRecipe();
     }

     onFetch(){

          this.dataservice.FetchRecipe().subscribe();

     }

     Logout(){
          this.authservice.logout();
     }

     ngOnDestroy(){

          this.userSub.unsubscribe();
     }

     

}