import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";
import {SchaffITStore} from "../../stores/schaffIT.store";

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
export class CountSelectPageComponent {
  private router: Router = inject(Router);
  private schaffIT_store = inject(SchaffITStore);

  public counts: number[] = [5, 10, 20, 30];

  public count_form: FormGroup = new FormGroup<any>({
    count: new FormControl([], Validators.required)
  })

  select_count() {
    if (this.count_form.valid) {
      this.load_questions();
      this.router.navigate(['question-page']).then();
    }
  }

  load_questions() {
    this.schaffIT_store.load_questions_by_amount_and_categories();
  }
}
