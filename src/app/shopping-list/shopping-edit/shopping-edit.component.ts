import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy, NgModule } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

@ViewChild('f',{static:true})slForm: NgForm;
subcription:Subscription;
editMode=false;
editedItemIndex: number;
editedItem: Ingredient;
  @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;
  
  constructor(private shoppingservice:ShoppingListService) { }

  ngOnInit() {
   this.subcription= this.shoppingservice.startEditing.subscribe(
     (index:number)=>{
       this.editMode=true;
       this.editedItemIndex=index;
       this.editedItem=this.shoppingservice.getIngredient(index);
       
       this.slForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       })

     }
   );
  }

  onSubmit(form: NgForm){

    const value = form.value
        
    const newIngredient = new Ingredient(value.name,value.amount);
    
    if(this.editMode){

      this.shoppingservice.onUpdateIngredient(this.editedItemIndex,newIngredient);

     }
     else{

      this.shoppingservice.onAdded(newIngredient);
     }
     form.reset();
     this.editMode=false;

    
  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){

    this.shoppingservice.deleteIngredient(this.editedItemIndex);
    this.onClear();


  }
}
