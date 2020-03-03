import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){



    }

    storeRecipe(){

       const recipes= this.recipeService.getRecipes();
     this.http.put("https://shopping-cart-e8092.firebaseio.com/recipes.json",recipes).subscribe(
         (response)=>{
             console.log(response);
         }
     );
    }

    FetchRecipe(){

        

            return this.http.get<Recipe[]>("https://shopping-cart-e8092.firebaseio.com/recipes.json",
            )

        .pipe(
        map(

            recipes =>{

                return recipes.map(recipe =>{

                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};//simply check whether the ingredient is empty or not if it is empty it has []
                }
                
                );
            })

        

        ,tap(
            res =>{
                this.recipeService.setRecipes(res);
             }
        )
        
        );
      
    }

}