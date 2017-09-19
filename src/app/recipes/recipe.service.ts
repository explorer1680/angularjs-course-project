import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is a simply a test', 'https://media.treehugger.com/assets/images/2013/06/JJH_3362-1.jpg.650x0_q70_crop-smart.jpg'),
        new Recipe('Another Test Recipe', 'This is a simply a test', 'http://img.sndimg.com/food/image/upload/q_92,fl_progressive/img/upload/editorial/PACKAGE-HEALTHY/VEGETARIAN/tofu.jpg')
    ];

    getRecipes(){
        return this.recipes.slice(); //this return a new array, which will exactly the copy of the original array.
    }
}