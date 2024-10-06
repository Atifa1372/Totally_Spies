import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {SchaffITStore} from "../../stores/schaffIT.store";
import {HeaderComponent} from "../../components/header/header.component";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Answer} from "../../interfaces/answer.interface";

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
export class QuestionPageComponent implements OnInit, OnDestroy {
  private router: Router = inject(Router);
  public schaffIT_store = inject(SchaffITStore);
  public selected_answer: any = null;

  ngOnInit() {
    this.schaffIT_store.start_timer();
  }

  ngOnDestroy() {
    this.schaffIT_store.pause_timer();
  }

  select_answer(answer: Answer) {
    this.selected_answer = answer;
    this.schaffIT_store.set_selected_answer_id(answer.id);
  }

  submit() {
    if (this.selected_answer) {
      if (this.selected_answer.isTrue) {
        this.schaffIT_store.increment_amount_of_correct_answers();
      }
      this.router.navigate(['answer-page']).then();
    } else {
      confirm("Bitte erst eine Antwort auswählen");
    }
  }
}
