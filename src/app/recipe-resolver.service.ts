import { Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './recipes/recipe.service';
@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private datastorage:DataStorageService,private recipeService:RecipeService){


    }


    resolve(route:ActivatedRouteSnapshot,state: RouterStateSnapshot){

        const recipes = this.recipeService.getRecipes()

        if(recipes.length ===0){
            return this.datastorage.FetchRecipe();
        }
        else{
            return recipes;
        }

      
         

    }





}