import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { SchaffITStore } from '../../stores/schaffIT.store';
import { Category } from '../../interfaces/category.interface';
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-category-select-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './category-select-page.component.html',
  styleUrls: ['./category-select-page.component.scss']
})
export class CategorySelectPageComponent {
  public schaffIT_store = inject(SchaffITStore);
  private router: Router = inject(Router);

  public categories: Category[] = this.schaffIT_store.categories();
  public selected_category_id: number|null = null;

  set_selected_category_id(category_id: number) {
    this.selected_category_id = category_id
  }

  // This method will navigate to the next page
  submit() {
    if (this.selected_category_id || this.selected_category_id === 0) {
      this.schaffIT_store.set_selected_category(this.selected_category_id);
      this.router.navigate(['count-select']).then();
    }
  }
}
