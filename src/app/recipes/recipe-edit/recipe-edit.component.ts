import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] != null;

      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if (recipe?.ingredients?.length) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new UntypedFormGroup({
              'name': new UntypedFormControl(ingredient.name, [Validators.required]),
              'amount': new UntypedFormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, [Validators.required]),
      'description': new UntypedFormControl(recipeDescription, [Validators.required]),
      'imagePath': new UntypedFormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(null, [Validators.required]),
        'amount': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    // this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
