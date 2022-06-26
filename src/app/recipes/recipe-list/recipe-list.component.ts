import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Test descr', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'),
    new Recipe('Test Recipe 2', 'Test descr 2', 'https://www.seriouseats.com/thmb/t9WrKWmayGJmdIGMQeiYG-3k_Mw=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__03__20160328-channa-masala-recipe-6-ae4913c04d5b43e9acef2917a74aa5fc.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.recipes);
  }

}
