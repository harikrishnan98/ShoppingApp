import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
  private igChangedSub:Subscription;

  constructor(private shoppinglist:ShoppingListService ) { }

  ngOnInit() {
    this.ingredients=this.shoppinglist.getIngredients();
   this.igChangedSub= this.shoppinglist.ingredientsChanged
    .subscribe(
      (ingredients:Ingredient[])=>{
        console.log(ingredients)
        this.ingredients = ingredients;
      });
    
  }
  ngOnDestroy(){
    this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppinglist.startEditing.next(index);
  }




}
