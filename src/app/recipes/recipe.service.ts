import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

// @Injectable()
export class RecipeService {
    // recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    constructor(){}//private shoppingListService: ShoppingListService,
        // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is a simply a test',
            'https://media.treehugger.com/assets/images/2013/06/JJH_3362-1.jpg.650x0_q70_crop-smart.jpg',
            [new Ingredient('Cheese', 5),
            new Ingredient('Vegitable', 5), new Ingredient('Fruit', 6)]
        ),
        new Recipe('Another Test Recipe',
            'This is a simply a test',
            'http://img.sndimg.com/food/image/upload/q_92,fl_progressive/img/upload/editorial/PACKAGE-HEALTHY/VEGETARIAN/tofu.jpg',
            [new Ingredient('Tofu', 2),
            new Ingredient('Vegitable', 5),
            new Ingredient('rice', 3)
            ])
    ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); //this return a new array, which will exactly the copy of the original array.
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    // addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //     // this.shoppingListService.addIngredients(ingredients);
    //     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}