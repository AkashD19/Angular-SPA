import {Recipe} from './recipes.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject();
  private recipes: Recipe[] = [
    new Recipe(
      'TestRecipe',
      'This is just a test.',
      'https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('Potatoes',20)
      ]),
    new Recipe('TestRecipe2',
      ' another test',
      'https://www.cbc.ca/food/content/images/recipes/Stuffing.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1)
      ])
  ];


  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: any[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);

  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
