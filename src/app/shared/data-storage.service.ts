import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class DataStorageService {
  constructor (private http: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-project-44358.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://ng-project-44358.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
        (data: any[]) => {
          for (let recipe of data) {
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
