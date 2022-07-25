import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/services/recipe.service';
import { Recipe } from '../recipes/models/recipe';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly apiUrl = 'https://angular-course-project-api-default-rtdb.europe-west1.firebasedatabase.app';
  private readonly recipeDomain = 'recipes';
  private readonly shoppingListDomain = 'shopping-list';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const url = `${this.apiUrl}/recipes.json`;
    const recipes = this.recipeService.getRecipes();

    this.http.put(url, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    const url = `${this.apiUrl}/recipes.json`;

    return this.http.get<Recipe[]>(url)
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }),
        tap(recipes => {
          this.recipeService.mergeRecipes(recipes);
        })
      );
  }
}
