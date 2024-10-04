import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SchaffITStore} from "../../stores/schaffIT.store";
import {Router} from "@angular/router";
import {Question} from "../../interfaces/question.interface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-answer-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './answer-page.component.html',
  styleUrl: './answer-page.component.scss'
})
export class AnswerPageComponent {
  private router: Router = inject(Router);
  public schaffIT_store = inject(SchaffITStore);

  public question: Question = this.schaffIT_store.get_first_question_of_array();
  public selected_answer_id: number|null = this.schaffIT_store.selected_answer_id();
  public last_question: boolean = this.schaffIT_store.question_count() == this.schaffIT_store.selected_amount_of_questions();

  finish_question() {
    this.schaffIT_store.delete_first_question_of_array();
    this.router.navigate(['question-page']).then();
  }
}
