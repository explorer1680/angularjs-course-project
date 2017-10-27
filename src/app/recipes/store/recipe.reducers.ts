import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActons from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
    recipes: State
}

export interface State {
    recipes: Recipe[];
};

const initialState: State = {
    recipes: [
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
    ]
};

export function recipeReducer(state = initialState, action: RecipeActons.RecipeActions) {
    switch(action.type){
        case(RecipeActons.SET_RECIPES):
        return {
            ...state,
            recipes: [...action.payload]
        };
        case(RecipeActons.ADD_RECIPE):
        return {
            ...state,
            recipes: [...state.recipes, action.payload]
        };
        case(RecipeActons.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updatedRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updatedRecipe;
        return {
            ...state,
            recipes: recipes
        };
        case(RecipeActons.DELETE_RECIPE):
        const oldRecipes = [...state.recipes];
        oldRecipes.splice(action.payload, 1)
        return{
            ...state,
            recipes: oldRecipes
        }
        default:
        return state;
    }
}