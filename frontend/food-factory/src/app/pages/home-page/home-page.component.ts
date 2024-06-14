import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { state } from '@angular/animations';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipeCardComponent,MatIconModule,MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  recipes = [1,1,1,1,11,1]
  constructor(public dialog: MatDialog, public authService:AuthServiceService, private recipeService:RecipeServiceService) { }

  handleOpenCreateRecipeForm(){
    this.dialog.open(CreateRecipeFormComponent)
  }

  ngOnInit(){
    this.authService.getUserProfile().subscribe({
      next: (response)=>{
        console.log("User Profile", response)
      }
    });
    this.recipeService.getRecipes().subscribe({
      next: (response)=>{
        console.log("Recipes", response)
        this.recipes = response;
      }
    });
    this.recipeService.recipeSubject.subscribe(
     (state)=>{
      console.log("State", state);
      this.recipes = state.recipes;
    });


  }

}
