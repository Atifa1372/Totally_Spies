import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {NgIf} from "@angular/common";
import {SchaffITStore} from "../../stores/schaffIT.store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-score-page',
  standalone: true,
    imports: [
        HeaderComponent,
        NgIf
    ],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss'
})
export class ScorePageComponent implements OnInit {
  private schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public score: number = this.schaffIT_store.amount_of_correct_answers();
  public amount_of_questions: number = this.schaffIT_store.selected_amount_of_questions();
  public emoji: string = ''
  public message: string = '';
  //time: number=10;

  ngOnInit() {
    if (!this.schaffIT_store.all_answered()) {
      this.router.navigate(['/category-select']).then(() => confirm('Es muss erst eine Kategorie und die Anzahl der Fragen ausgewählt werden.'))
    }
    this.updateMessage();
  }

  // Methode, um die Nachricht + Emoji (je nach Anzahl, richtig beantworteter Fragen), zu aktualisieren
  updateMessage() {
    if (this.score > (this.amount_of_questions / 3 * 2)) {
      this.message = 'Gut gemacht!';
      this.emoji = 'happy';
    } else if (this.score <= (this.amount_of_questions / 3 * 2) && this.score >= (this.amount_of_questions / 3)) {
      this.message = 'Das kannst du besser!';
      this.emoji = 'sad';
    } else if (this.score < (this.amount_of_questions / 3)) {
      this.message = 'Was machst du hier?';
      this.emoji = 'surprise';
    }
  }


  backToQuiz() {
    this.schaffIT_store.reset_store();
    this.router.navigate(['category-select']).then();
  }
}

