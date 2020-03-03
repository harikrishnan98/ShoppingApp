import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({

    declarations:[
        AuthComponent

    ],

    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild([{path: 'auth-page',component: AuthComponent}]),
        SharedModule
    ],

   


})
export class AuthModule{}