import { Component,OnInit } from '@angular/core';
import {EmojiComponent} from "../../components/emoji/emoji.component";
import {ScoreComponent} from "../../components/score/score.component";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [
    EmojiComponent,
    ScoreComponent,
    HeaderComponent
  ],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss'
})
export class ScorePageComponent implements OnInit {

  // mehr als 15 --> gut gemacht
  // weniger als 14 --> Das kannst du besser
  // weniger als 6 --> was machst du hier

  score: number = 9;  // Beispiel
  message: string = '';  // Nachricht
  time: number=10; // beispiel

  ngOnInit() {
    this.updateMessage();
  }

  // Methode, um die Nachricht zu aktualisieren
  updateMessage() {
    if (this.score > 15) {
      this.message = 'Gut gemacht!';
    } else if (this.score <= 14 && this.score >= 6) {
      this.message = 'Das kannst du besser.';
    } else if (this.score < 6) {
      this.message = 'Was machst du hier?';
    }
  }

  
  backToQuiz() {
    // Hier kannst du die Logik hinzufügen, um zum Quiz zurückzukehren.
    console.log('Zurück zum Quiz');
  }







}

