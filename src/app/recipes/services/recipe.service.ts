import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shopping-list/models/ingredient';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Test descr 1', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
      [
        new Ingredient('Test ingredient 1', 1), new Ingredient('Test ingredient 1', 1)
      ]),
    new Recipe('Test Recipe 2', 'Test descr 2', 'https://www.seriouseats.com/thmb/t9WrKWmayGJmdIGMQeiYG-3k_Mw=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__03__20160328-channa-masala-recipe-6-ae4913c04d5b43e9acef2917a74aa5fc.jpg',
      [
        new Ingredient('Test ingredient 2', 2), new Ingredient('Test ingredient 2', 2),
      ]),
    new Recipe('Test Recipe 3', 'Test descr 3', 'https://www.seriouseats.com/thmb/t9WrKWmayGJmdIGMQeiYG-3k_Mw=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__03__20160328-channa-masala-recipe-6-ae4913c04d5b43e9acef2917a74aa5fc.jpg',
      [
        new Ingredient('Test ingredient 3', 3), new Ingredient('Test ingredient 3', 3),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this, this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
