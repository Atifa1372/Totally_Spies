import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";

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

  public counts: number[] = [5, 10, 20, 30];

  public count_form: FormGroup = new FormGroup<any>({
    count: new FormControl([], Validators.required)
  })

  select_count() {
    this.router.navigate(['count-select', this.count_form.get('count')?.value]).then();
  }
}
