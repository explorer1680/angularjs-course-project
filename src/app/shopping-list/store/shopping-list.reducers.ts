import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAcitons from './shopping-list.actions';


const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListAcitons.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListAcitons.ADD_INGREDIENT:
            return { 
                ...state, //return the old state as the first parameter.
                ingredients: [...state.ingredients, action.payload] //and specify which part you want to change in the second parameter.
            }
        default:
            return state;
    }
}