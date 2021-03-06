import { Actions, Effect } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Http, Response } from '@angular/http';
import { Recipe } from '../../recipes/recipe.model';
import 'rxjs/add/operator/withLatestFrom';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    private token = null;

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            this.store.select('auth').subscribe((value: fromAuth.State) => {
                this.token = value.token;
            });

            return this.http.get('https://ng-recipe-book-a8294.firebaseio.com/recipes.json?auth=' + this.token)
        })
        .map(
        (response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        }
        );

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            this.store.select('auth').subscribe((value: fromAuth.State) => {
                this.token = value.token;
            });
            // .map((authState: fromAuth.State) => {
            //     return authState.token;
            // });

            // console.log(this.token);

            return this.http.put('https://ng-recipe-book-a8294.firebaseio.com/recipes.json?auth=' + this.token, state.recipes);
        });

    constructor(private actions$: Actions,
        // private store: Store<fromApp.AppState>,
        private store: Store<fromRecipe.FeatureState>,
        private http: Http) { }
}