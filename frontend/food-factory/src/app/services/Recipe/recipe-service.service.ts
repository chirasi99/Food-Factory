import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  private baseUrl: string = 'http://localhost:5454'

  constructor(private http:HttpClient) {}

   recipeSubject = new BehaviorSubject<any>({
    recipes:[],
    loading:false,
    newRecipe:null
   })

   private getHeader():HttpHeaders{
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
   }

   getRecipes():Observable<any> {
    const header = this.getHeader();
    return this.http.get<any>(`${this.baseUrl}/api/recipe`, {headers:header}).pipe(tap(recipes=>{
      const currentState = this.recipeSubject.value;
      this.recipeSubject.next({...currentState, recipes});
    })
  );
   }

   createRecipes(recipe:any):Observable<any> {
    const header = this.getHeader();
    return this.http.post<any>(`${this.baseUrl}/api/recipe`, recipe , {headers:header}).pipe(tap(newRecipe=>{
      const currentState = this.recipeSubject.value;
      this.recipeSubject.next({...currentState, recipes:[newRecipe, ...currentState.recipes]});
    })
  );
   }
   
   updateRecipes(recipe:any):Observable<any> {
    const header = this.getHeader();
    return this.http.put<any>(`${this.baseUrl}/api/recipe/${recipe.id}`, recipe , {headers:header}).pipe(tap((updatedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>{item.id === updatedRecipe.id ? updatedRecipe:item});
      this.recipeSubject.next({...currentState, recipes:updatedRecipes});
    })
  );
   }

   likeRecipes(id:any):Observable<any> {
    const header = this.getHeader();
    return this.http.put<any>(`${this.baseUrl}/api/recipe/${id}` , {headers:header}).pipe(tap((updatedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>{item.id === updatedRecipe.id ? updatedRecipe:item});
      this.recipeSubject.next({...currentState, recipes:updatedRecipes});
    })
   );
   }

    deleteRecipes(id:any):Observable<any> {
      const header = this.getHeader();
      return this.http.delete<any>(`${this.baseUrl}/api/recipe/${id}`, {headers:header}).pipe(tap(()=>{
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.filter((item:any)=>item.id !== id);
        this.recipeSubject.next({...currentState, recipes:updatedRecipes});
      }));
    }

}
