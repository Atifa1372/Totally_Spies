import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { SchaffITStore } from '../../stores/schaffIT.store';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-select-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './category-select-page.component.html',
  styleUrls: ['./category-select-page.component.scss']
})
export class CategorySelectPageComponent {
  public schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public categories: Category[] = [];
  public selectedSubject: string = ''; // This will store the selected subject

  public category_form: FormGroup = new FormGroup<any>({
    category: new FormControl(null, Validators.required)
  });


  selectSubject(subject: string) {
    this.selectedSubject = subject; // Store the selected subject
  }

  // This method will navigate to the next page
  select_category() {
    if (this.category_form.valid) {
      this.schaffIT_store.set_selected_category(this.category_form.get('category')?.value);
      this.router.navigate(['count-select']).then();
    }
  }
}
