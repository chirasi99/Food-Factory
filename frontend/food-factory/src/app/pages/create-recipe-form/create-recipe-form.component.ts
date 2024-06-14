import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,MatRadioModule],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss'
})
export class CreateRecipeFormComponent {
  
  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:""
  }

  constructor(private recipeService:RecipeServiceService) { }

  onSubmit(){
    console.log("Values : ", this.recipeItem);
    this.recipeService.createRecipes(this.recipeItem).subscribe({
      next: (response)=>{
        console.log("Recipe Created", response)
      },
      error: (error)=>{
        console.error("Error", error)
      }
    })
  }
}
