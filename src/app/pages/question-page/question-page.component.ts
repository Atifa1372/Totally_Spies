import {Component, inject, OnInit} from '@angular/core';
import {SchaffITStore} from "../../stores/schaffIT.store";

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {
  private store = inject(SchaffITStore);

  ngOnInit() {
    console.log(this.store.questions())
  }

}
