import {Component, inject} from '@angular/core';
import {SchaffITStore} from "../../stores/schaffIT.store";
import {HeaderComponent} from "../../components/header/header.component";
import {Question} from "../../interfaces/question.interface";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf
  ],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent {
  private schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public question: Question = this.schaffIT_store.get_first_question();
  public selected_answer: any = null;

  /*button_clicked(answer_id: number) {
    const btn: any = document.getElementsByTagName("button");
    btn.classList.remove('selected');

    const clicked_btn: any = document.getElementById(answer_id.toString());
    clicked_btn.classList.add('selected');
  }*/

  select_answer() {
    if (this.selected_answer) {
      this.schaffIT_store.set_selected_answer_id(this.selected_answer?.id);
      if (this.selected_answer?.is_true) {
        this.schaffIT_store.increment_amount_of_correct_answers();
      }
      this.router.navigate(['answer-page']).then();
    } else {
      confirm("Bitte erst eine Antwort auswählen");
    }
  }
}
