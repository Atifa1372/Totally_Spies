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
    count: new FormControl(null, Validators.required)
  })

  select_count() {
    if (this.count_form.valid) {
      this.schaffIT_store.set_selected_amount(this.count_form.get('count')?.value);
      this.router.navigate(['question-page']).then(() => this.load_questions());
    }
  }

  load_questions() {
    this.schaffIT_store.load_questions();
  }
}
