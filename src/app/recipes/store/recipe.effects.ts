import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../models/recipe';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
    private readonly apiUrl = 'https://angular-course-project-api-default-rtdb.europe-west1.firebasedatabase.app';
    private readonly recipeDomain = 'recipes';
    private readonly shoppingListDomain = 'shopping-list';

    fetchRecipes$ = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                const url = `${this.apiUrl}/${this.recipeDomain}.json`;

                return this.http.get<Recipe[]>(url)
            }),
            map((recipes) => {
                if (recipes) {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                } else {
                    return [];
                }
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes);
            })
        )
    );

    storeRecipes = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                const url = `${this.apiUrl}/recipes.json`;
                return this.http.put(url, recipesState.recipes);
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}