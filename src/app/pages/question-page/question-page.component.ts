import {Component, inject} from '@angular/core';
import {SchaffITStore} from "../../stores/schaffIT.store";
import {HeaderComponent} from "../../components/header/header.component";
import {Question} from "../../interfaces/question.interface";
import {Router} from "@angular/router";
import {Answer} from "../../interfaces/answer.interface";

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent {
  private schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public question: Question = this.schaffIT_store.get_first_question();

  select_answer(answer: Answer) {
    this.schaffIT_store.set_selected_answer_id(answer.id);
    if (answer.is_true) {
      this.schaffIT_store.increment_amount_of_correct_answers();
    }
    this.router.navigate(['answer-page']).then();
  }
}
