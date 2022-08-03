import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subs: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      })
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
