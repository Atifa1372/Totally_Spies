import { Component } from '@angular/core';
import {EmojiComponent} from "../../components/emoji/emoji.component";
import {ScoreComponent} from "../../components/score/score.component";

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [
    EmojiComponent,
    ScoreComponent
  ],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css'
})
export class ScorePageComponent {

}