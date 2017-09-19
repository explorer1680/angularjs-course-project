import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    // this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
  }
}
