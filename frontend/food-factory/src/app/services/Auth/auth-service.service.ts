import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: string = 'http://localhost:5454'

  constructor(private http:HttpClient) {}

   authSubject = new BehaviorSubject<any>({
    user:null
   })

   login(Userdata:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, Userdata);
   }

   register(Userdata:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, Userdata);
   }

   getUserProfile():Observable<any>{
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<any>(`${this.baseUrl}/api/users/profile`, {headers:header}).pipe(tap(user=>{
      console.log("User Profile", user);
      const currentState = this.authSubject.value;
      this.authSubject.next({...currentState, user});
    })
  )
 
   }
   logout(){
    localStorage.clear();
    this.authSubject.next({});
  }

}
