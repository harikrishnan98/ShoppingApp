import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

 @Output() recipeWasSelected = new EventEmitter<Recipe>();

 recipes: Recipe[];
 recipeSubcription:Subscription;

  constructor(private recipeService:RecipeService,private route:Router,private router:ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubcription =this.recipeService.recipeChanged
    .subscribe(
      (recipes: Recipe[])=>{
        this.recipes=recipes;


      }
    )
  }

  onAddNewRecipe(){

    this.route.navigate(['new'],{relativeTo:this.router});

  }

  ngOnDestroy(){
    this.recipeSubcription.unsubscribe();
  }

  

}
