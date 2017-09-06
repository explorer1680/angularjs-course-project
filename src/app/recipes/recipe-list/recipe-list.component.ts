import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
      new Recipe('A Test Recipe', 'This is a simply a test', 'https://media.treehugger.com/assets/images/2013/06/JJH_3362-1.jpg.650x0_q70_crop-smart.jpg'),
      new Recipe('A Test Recipe', 'This is a simply a test', 'https://media.treehugger.com/assets/images/2013/06/JJH_3362-1.jpg.650x0_q70_crop-smart.jpg')
    ];


  constructor() { }

  ngOnInit() {
  }

}
