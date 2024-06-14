import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthServiceService } from './services/Auth/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent, FooterComponent, HomePageComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'food-factory';
  user:any = null;

  constructor(public authService:AuthServiceService) { }

  ngOnInit(){
    this.authService.getUserProfile().subscribe({
      next: (response)=>{
        console.log("Register User Profile", response)
      },
      error:(error)=>{
        console.log("Error", error)
      }
    });
    this.authService.authSubject.subscribe(
      (auth) => {
        console.log("Auth sate: ", auth)
        this.user = auth.user;
      }
    )
  }


}
