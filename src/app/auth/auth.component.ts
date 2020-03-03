import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective


  isLoginMode =true;
  isLoading = false;
  username = '';

  closeSub:Subscription;

  errorMsg="";

  constructor(private authService:AuthService, private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit() {
  }


  onSwitchMode(){

    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){

    if(!form.valid){

      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponseData>;

    if(this.isLoginMode){

      authObs= this.authService.login(email,password);
    
    }
    else{

     authObs= this.authService.signup(email,password);
    }
    

      authObs.subscribe(

        
        (response)=>{
          console.log(response);
          
          this.isLoading =false;
          this.router.navigate(['/recipes']);
        },
        errorRes =>{ //always after the response data the error will displayed  (if there is only any error in the request )
           
        
           console.log(errorRes);

           this.errorMsg=errorRes;

           this.showErrorAlert(errorRes);

           this.isLoading =false;

         
        }

      );
  

    

   
    console.log(form.value);
    form.reset();



  }

  // onHandleError(){
  //   this.errorMsg = null;
  // }

  private showErrorAlert(message: string){

    //const AlertCmp = new AlertComponent()

    const alertCmp =this.componentFactoryResolver
    .resolveComponentFactory
    (AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    
    hostViewContainerRef.clear(); //to clean the DOM where the directive is placed

    const componentRef=hostViewContainerRef.createComponent(alertCmp);

    componentRef.instance.message = message;

    this.closeSub=componentRef.instance.close.subscribe(()=>{

      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();


    });



    


  }

  ngOnDestroy(){
    
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
