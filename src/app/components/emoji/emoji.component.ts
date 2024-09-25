import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-emoji-component',
  standalone: true,
  imports: [CommonModule , 
    HeaderComponent
  ],
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.scss'

})
export class EmojiComponent {
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

  // Methode, um zum Quiz zurückzukehren
  backToQuiz() {
    
    console.log('Zurück zum Quiz'); }

}
