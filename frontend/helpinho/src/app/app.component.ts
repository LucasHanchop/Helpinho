import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { HomeComponent } from "./pages/home/home.component"
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'helpinho'
}
