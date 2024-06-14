import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditRecipeFormComponent } from '../edit-recipe-form/edit-recipe-form.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  
  @Input() recipe:any

  constructor(public dialog: MatDialog, private recipeService:RecipeServiceService) { }

  handleOpenEditRecipeForm(){
    this.dialog.open(EditRecipeFormComponent,{data: this.recipe})
  }

  handleDeleteRecipe(){
    this.recipeService.deleteRecipes(this.recipe.id).subscribe({
      next: (response)=>{
        console.log("Recipe Deleted", response)
      },
      error: (error)=>{
        console.error("Error", error)
      }
    })
  }

}
