import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {//, OnDestroy {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
    // );
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }


  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }
}
