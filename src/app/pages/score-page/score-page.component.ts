import { Component } from '@angular/core';
import {EmojiComponentComponent} from "../../components/emoji-component/emoji-component.component";
import {ScoreComponentComponent} from "../../components/score-component/score-component.component";

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [
    EmojiComponentComponent,
    ScoreComponentComponent
  ],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css'
})
export class ScorePageComponent {

}
