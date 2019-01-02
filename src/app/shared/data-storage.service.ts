import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';

@Injectable()

export class DataStorageService {
  constructor (private http: HttpClient,
               private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://ng-project-44358.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://ng-project-44358.firebaseio.com/recipes.json')
      .subscribe(
        (data) => {
          for (const recipe of data) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          this.recipeService.setRecipes(data);
        }
      );
  }
}
