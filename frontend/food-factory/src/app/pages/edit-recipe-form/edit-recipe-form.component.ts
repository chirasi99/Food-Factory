import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-edit-recipe-form',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,MatRadioModule],
  templateUrl: './edit-recipe-form.component.html',
  styleUrl: './edit-recipe-form.component.scss'
})
export class EditRecipeFormComponent {

  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:""
  }

  constructor(@Inject(MAT_DIALOG_DATA) public recipe:any ,private recipeService:RecipeServiceService) { }

  onSubmit(){
    this.recipeService.updateRecipes(this.recipeItem).subscribe
    ({
      next: (response)=>{
        console.log("Recipe Updated", response)
      },
      error: (error)=>{
        console.error("Error", error)
      }
    })
    console.log("Values --- : ", this.recipeItem);
  }

  ngOnInit(){
    this.recipeItem = this.recipe;
  }
  
}
