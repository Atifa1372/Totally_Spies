import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";
import {Router} from "@angular/router";
import {SchaffITStore} from "../../stores/schaffIT.store";

@Component({
  selector: 'app-category-select-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './category-select-page.component.html',
  styleUrl: './category-select-page.component.scss'
})
export class CategorySelectPageComponent {
  public schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public category_form: FormGroup = new FormGroup<any>({
    category: new FormControl([], Validators.required)
  })

  select_category() {
    if (this.category_form.valid) {
      this.schaffIT_store.set_selected_category(this.category_form.get('category')?.value);
      this.router.navigate(['count-select']).then();
    }
  }
}
