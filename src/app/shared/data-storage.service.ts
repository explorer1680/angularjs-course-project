import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


@Injectable()
export class DataStorageService {
    private token = null;
    constructor(private http: Http,
        private recipeService: RecipeService,
        // private authService: AuthService
        private store: Store<fromApp.AppState>) { }

    storeRecipes() {
        // const token = this.authService.getToken();
        // const token = null;
        
        this.store.select('auth').subscribe( (value: fromAuth.State) =>{
            this.token = value.token;
        });
        // .map((authState: fromAuth.State) => {
        //     return authState.token;
        // });

        // console.log(this.token);

        return this.http.put('https://ng-recipe-book-a8294.firebaseio.com/recipes.json?auth=' + this.token, this.recipeService.getRecipes());
    }

    getRecipes() {
        // const token = this.authService.getToken();
        // const token = this.store.select('auth').map((authState: fromAuth.State) => {
        //     return authState.token;
        // });

        this.store.select('auth').subscribe( (value: fromAuth.State) =>{
            this.token = value.token;
        });

        this.http.get('https://ng-recipe-book-a8294.firebaseio.com/recipes.json?auth=' + this.token)
            .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
            )
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
            );
    }
}