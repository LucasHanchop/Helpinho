import { Component } from '@angular/core'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  public profilePhoto: string | null = null
  public photo: string | null = null

}
