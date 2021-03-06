import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { ShoppingListService } from '../services/shopping-list.service';
import * as ShoppingListActions from '../store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;

  subs: Subscription;
  editMode = false;
  edditedItemIndex: number;
  edditedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.edditedItemIndex = index;
        this.editMode = true;
        this.edditedItem = this.shoppingListService.getIngredient(index);

        this.form.setValue({
          name: this.edditedItem.name,
          amount: this.edditedItem.amount
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.edditedItemIndex, newIngredient);
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onRemove() {
    this.shoppingListService.removeIngredient(this.edditedItemIndex);
    this.onClear();
  }
}
