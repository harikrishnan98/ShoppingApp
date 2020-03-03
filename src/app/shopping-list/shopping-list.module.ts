import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({

    declarations:[

        ShoppingListComponent,
        ShoppingEditComponent

    ],

    imports:[
        RouterModule.forChild([

            { path: 'shopping-list',component: ShoppingListComponent}
            
        ]),
        FormsModule,
        RouterModule,
        SharedModule
        
    ]



})
export class ShoppingModule{}