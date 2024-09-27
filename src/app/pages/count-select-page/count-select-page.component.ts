import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";
import {QuestionStore} from "../../stores/question.store";

@Component({
  selector: 'app-count-select-page',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './count-select-page.component.html',
  styleUrl: './count-select-page.component.scss'
})
export class CountSelectPageComponent implements OnInit{
  private router: Router = inject(Router);
  private activated_route: ActivatedRoute = inject(ActivatedRoute);
  private question_store = inject(QuestionStore);

  public counts: number[] = [5, 10, 20, 30];
  private category_id: number = 0;

  public count_form: FormGroup = new FormGroup<any>({
    count: new FormControl([], Validators.required)
  })

  ngOnInit() {
    this.activated_route.params.subscribe(params => this.category_id = params['category_id']);
  }

  select_count() {
    if (this.count_form.valid) {
      this.load_questions();
      this.router.navigate(['question-page']).then();
    }
  }

  load_questions() {
    this.question_store.loadQuestionsByAmountAndCategoryId(this.count_form.get('count')?.value, this.category_id);
  }
}
