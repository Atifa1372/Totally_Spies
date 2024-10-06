import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";
import {SchaffITStore} from "../../stores/schaffIT.store";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-count-select-page',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './count-select-page.component.html',
  styleUrl: './count-select-page.component.scss'
})
export class CountSelectPageComponent {
  private router: Router = inject(Router);
  private schaffIT_store = inject(SchaffITStore);

  public counts: number[] = [5, 10, 15, 20];
  public selected_count: number|null = null;

  select_count(count: number) {
    this.selected_count = count;
  }

  async submit() {
    if (this.selected_count) {
      this.schaffIT_store.set_selected_amount_and_load_questions(this.selected_count);
      await this.load_questions();
      this.router.navigate(['question-page']).then();
    }
  }

  async load_questions() {
    await this.sleep(1000);
    this.schaffIT_store.load_questions();
  }

  async sleep(ms: number): Promise<void> {
    return new Promise(
      (sleep) => setTimeout(sleep, ms));
  }
}
