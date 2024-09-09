import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../interfaces/category.interface";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";
import {Router} from "@angular/router";

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
export class CategorySelectPageComponent implements OnInit {
  private category_service: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);

  public categories: Category[] = [];

  public category_form: FormGroup = new FormGroup<any>({
    category: new FormControl([], Validators.required)
  })

  ngOnInit() {
    this.category_service.getCategories().subscribe(categories => {
      this.categories = categories
    })
  }

  select_category() {
    this.router.navigate(['count-select', this.category_form.get('category')?.value]).then();
  }
}
