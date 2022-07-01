import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe; //binding the property from outside the component f.e - recipe-list component
  // @Output() selectedRecipe = new EventEmitter<Recipe>(); //Future approach
  // @Output() selectedRecipe = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  // onSelectedRecipe(recipe: Recipe) {
  //   this.selectedRecipe.emit(recipe);
  //   console.log('Test', recipe)
  // }

  onSelectedRecipe() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
