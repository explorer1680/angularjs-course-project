import { Actions, Effect } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Http, Response } from '@angular/http';
import { Recipe } from '../../recipes/recipe.model';

export class RecipeEffects {
    private token = null;

    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
                this.store.select('auth').subscribe( (value: fromAuth.State) =>{
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
                return {type: RecipeActions.SET_RECIPES,
                payload: recipes};
            }
    );

    constructor(private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: Http,){}
}