import { Component, OnInit } from '@angular/core';
import { Ingredient } from './models/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Test ingredient 1", 1),
    new Ingredient("Test ingredient 2", 2)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
