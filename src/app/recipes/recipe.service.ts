import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()

export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    


  /* private recipes: Recipe[] = [
        new Recipe('A test recipe',
        'This is a simple a testing',
        'http://appsgeyser.com/blog/wp-content/uploads/2016/12/recipe-icon-6.png'
        ,[
            new Ingredient('Meat',1),
            new Ingredient('Fries',20)
          
        ]),
        new Recipe('A test recipe',
        'This is a simple a testing',
        'http://appsgeyser.com/blog/wp-content/uploads/2016/12/recipe-icon-6.png',
        [
            new Ingredient('Buns',1),
            new Ingredient('Fries',20)
        ]),
        
      ]; */

     private recipes : Recipe[] = [];

      constructor(private slService:ShoppingListService) {
        
    }

      setRecipes(recipes:Recipe[]){

        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());


      }
  

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        
     this.slService.addIngredient(ingredients);
      }

      addRecipe(recipe:Recipe){

        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number, newRecipe: Recipe){

        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());

      }

      deleteRecipe(index:number){
          this.recipes.splice(index,1);
          this.recipeChanged.next(this.recipes.slice());
      }


}
