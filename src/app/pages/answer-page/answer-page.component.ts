import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {SchaffITStore} from "../../stores/schaffIT.store";
import {Router} from "@angular/router";
import {Question} from "../../interfaces/question.interface";

@Component({
  selector: 'app-answer-page',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './answer-page.component.html',
  styleUrl: './answer-page.component.scss'
})
export class AnswerPageComponent {
  private schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public question: Question = this.schaffIT_store.get_first_question();

  finish_question() {
    this.schaffIT_store.delete_first_question();
    this.router.navigate(['question-page']).then();
  }
}
