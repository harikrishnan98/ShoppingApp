import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    private ingredients : Ingredient[]  =[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
      ];

      getIngredient(index:number){
          return this.ingredients[index];
      }

      
      getIngredients(){
          return this.ingredients.slice();
      }
      onAdded(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredient(ingredients:Ingredient[]){

        console.log('ingredients',ingredients)
        this.ingredients.push(...ingredients);
        console.log('after push',this.ingredients)
        this.ingredientsChanged.next(this.ingredients.slice());

      }
      onUpdateIngredient(index: number, newIngredient: Ingredient){
 
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
        

      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}